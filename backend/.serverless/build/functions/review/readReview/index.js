// node_modules/@middy/core/index.js
import { setTimeout } from "node:timers";

// node_modules/@middy/core/executionModeStandard.js
var executionModeStandard = ({ middyRequest, runRequest: runRequest2 }, beforeMiddlewares, lambdaHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  const middy2 = async (event, context) => {
    const request = middyRequest(event, context);
    plugin.requestStart(request);
    const response = await runRequest2(
      request,
      beforeMiddlewares,
      lambdaHandler,
      afterMiddlewares,
      onErrorMiddlewares,
      plugin
    );
    await plugin.requestEnd(request);
    return response;
  };
  middy2.handler = (replaceLambdaHandler) => {
    lambdaHandler = replaceLambdaHandler;
    return middy2;
  };
  return middy2;
};

// node_modules/@middy/core/index.js
var defaultLambdaHandler = () => {
};
var noop = () => {
};
var defaultPluginConfig = {
  timeoutEarlyInMillis: 5,
  timeoutEarlyResponse: () => {
    const err = new Error("[AbortError]: The operation was aborted.", {
      cause: { package: "@middy/core" }
    });
    err.name = "TimeoutError";
    throw err;
  },
  executionMode: executionModeStandard
};
var middy = (setupLambdaHandler, pluginConfig) => {
  let lambdaHandler;
  let plugin;
  if (typeof setupLambdaHandler === "function") {
    lambdaHandler = setupLambdaHandler;
    plugin = { ...defaultPluginConfig, ...pluginConfig };
  } else {
    lambdaHandler = defaultLambdaHandler;
    plugin = { ...defaultPluginConfig, ...setupLambdaHandler };
  }
  plugin.timeoutEarly = plugin.timeoutEarlyInMillis > 0;
  plugin.requestStart ??= noop;
  plugin.requestEnd ??= noop;
  plugin.beforeHandler ??= noop;
  plugin.afterHandler ??= noop;
  plugin.beforePrefetch?.();
  const beforeMiddlewares = [];
  const afterMiddlewares = [];
  const onErrorMiddlewares = [];
  const middyRequest = (event = {}, context = {}) => {
    return {
      event,
      context,
      response: void 0,
      error: void 0,
      internal: plugin.internal ?? {}
    };
  };
  const middy2 = plugin.executionMode(
    { middyRequest, runRequest },
    beforeMiddlewares,
    lambdaHandler,
    afterMiddlewares,
    onErrorMiddlewares,
    plugin
  );
  middy2.use = (inputMiddleware) => {
    const middlewares = Array.isArray(inputMiddleware) ? inputMiddleware : [inputMiddleware];
    for (const middleware of middlewares) {
      const { before, after, onError } = middleware;
      if (before || after || onError) {
        if (before) middy2.before(before);
        if (after) middy2.after(after);
        if (onError) middy2.onError(onError);
      } else {
        throw new Error(
          'Middleware must be an object containing at least one key among "before", "after", "onError"',
          {
            cause: { package: "@middy/core" }
          }
        );
      }
    }
    return middy2;
  };
  middy2.before = (beforeMiddleware) => {
    beforeMiddlewares.push(beforeMiddleware);
    return middy2;
  };
  middy2.after = (afterMiddleware) => {
    afterMiddlewares.unshift(afterMiddleware);
    return middy2;
  };
  middy2.onError = (onErrorMiddleware) => {
    onErrorMiddlewares.unshift(onErrorMiddleware);
    return middy2;
  };
  return middy2;
};
var handlerAbort = new AbortController();
var abortOpts = { signal: handlerAbort.signal };
var runRequest = async (request, beforeMiddlewares, lambdaHandler, afterMiddlewares, onErrorMiddlewares, plugin) => {
  let timeoutID;
  const getRemainingTimeInMillis = request.context.getRemainingTimeInMillis || request.context.lambdaContext?.getRemainingTimeInMillis;
  const timeoutEarly = plugin.timeoutEarly && getRemainingTimeInMillis;
  try {
    await runMiddlewares(request, beforeMiddlewares, plugin);
    if (!("earlyResponse" in request)) {
      plugin.beforeHandler();
      if (handlerAbort.signal.aborted) {
        handlerAbort = new AbortController();
        abortOpts = { signal: handlerAbort.signal };
      }
      const handlerResult = lambdaHandler(
        request.event,
        request.context,
        abortOpts
      );
      if (timeoutEarly) {
        let timeoutResolve;
        const timeoutPromise = new Promise((resolve, reject) => {
          timeoutResolve = () => {
            handlerAbort.abort();
            try {
              resolve(plugin.timeoutEarlyResponse());
            } catch (err) {
              reject(err);
            }
          };
        });
        timeoutID = setTimeout(
          timeoutResolve,
          getRemainingTimeInMillis() - plugin.timeoutEarlyInMillis
        );
        request.response = await Promise.race([handlerResult, timeoutPromise]);
      } else {
        request.response = await handlerResult;
      }
      if (timeoutID) {
        clearTimeout(timeoutID);
      }
      plugin.afterHandler();
      await runMiddlewares(request, afterMiddlewares, plugin);
    }
  } catch (err) {
    if (timeoutID) {
      clearTimeout(timeoutID);
    }
    request.response = void 0;
    request.error = err;
    try {
      await runMiddlewares(request, onErrorMiddlewares, plugin);
    } catch (err2) {
      err2.originalError = request.error;
      request.error = err2;
      throw request.error;
    }
    if (typeof request.response === "undefined") throw request.error;
  }
  return request.response;
};
var runMiddlewares = async (request, middlewares, plugin) => {
  for (const nextMiddleware of middlewares) {
    plugin.beforeMiddleware?.(nextMiddleware.name);
    const res = await nextMiddleware(request);
    plugin.afterMiddleware?.(nextMiddleware.name);
    if (typeof res !== "undefined") {
      request.earlyResponse = res;
    }
    if ("earlyResponse" in request) {
      request.response = request.earlyResponse;
      return;
    }
  }
};
var core_default = middy;

// config/db.ts
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
var client = new DynamoDBClient({ region: "eu-north-1" });

// functions/review/readReview/index.ts
import { QueryCommand } from "@aws-sdk/client-dynamodb";
var readReviewHandler = async (event) => {
  const user = event.user;
  try {
    const readCommand = new QueryCommand({
      TableName: "ApplicationsTable",
      IndexName: "GSIREVIEWS",
      KeyConditionExpression: "gsi1pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "REVIEW" }
      },
      ScanIndexForward: false
    });
    const data = await client.send(readCommand);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "review successfully recieved",
        data
      })
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" })
    };
  }
};
var handler = core_default(readReviewHandler).onError((request) => {
  const message = request.error?.message || "Something went wrong";
  const authErrors = [
    "Missing Authorization header",
    "Invalid Authorization format",
    "Missing token",
    "Unauthorized"
  ];
  const validationDetails = request.error?.cause?.data || null;
  const isValidationError = message === "Event object failed validation" || !!validationDetails;
  const isAuthError = authErrors.includes(message);
  let statusCode = 500;
  if (isValidationError) statusCode = 400;
  else if (isAuthError) statusCode = 401;
  request.response = {
    statusCode,
    body: JSON.stringify({
      success: false,
      message: isValidationError ? "Input validation failed" : message,
      details: validationDetails
    })
  };
});
export {
  handler
};
//# sourceMappingURL=index.js.map
