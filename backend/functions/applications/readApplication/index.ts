import middy from "@middy/core";
import { client } from "../../../config/db";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";
import { AuthenticatedEvent } from "../../../backendTypes/backendTypes";

const readApplication = async (event: AuthenticatedEvent) => {
  const userName = event.user.username.S;

  try {
    const command = new QueryCommand({
      TableName: "ApplicationsTable",
      KeyConditionExpression: "pk = :pk AND begins_with(sk, :skPrefix)",
      ExpressionAttributeValues: {
        ":pk": `USERNAME#${userName}`,
        ":skPrefix": "APPLICATION",
      },
    });

    const result = await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Application(s) recieved succesfully",
        data: result.Items,
      }),
    };
  } catch (error: unknown) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        // message: error.message,
        message:
          error instanceof Error ? error.message : "Something went wrong",
      }),
    };
  }
};

export const handler = middy(readApplication)
  .use(checkAuth())
  .onError((request) => {
    const message = request.error?.message || "Something went wrong";

    const authErrors = [
      "Missing Authorization header",
      "Invalid Authorization format",
      "Missing token",
      "Unauthorized",
    ];

    const validationDetails = (request.error as any)?.cause?.data || null;
    const isValidationError =
      message === "Event object failed validation" || !!validationDetails;
    const isAuthError = authErrors.includes(message);

    let statusCode = 500;

    if (isValidationError) statusCode = 400;
    else if (isAuthError) statusCode = 401;

    request.response = {
      statusCode,
      body: JSON.stringify({
        success: false,
        message: isValidationError ? "Input validation failed" : message,
        details: validationDetails,
      }),
    };
  });
