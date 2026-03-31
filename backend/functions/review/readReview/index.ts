import middy from "@middy/core";
import { client } from "../../../config/db";
import { QueryCommand } from "@aws-sdk/client-dynamodb";

const readReviewHandler = async (event) => {
  const user = event.user;

  try {
    const readCommand = new QueryCommand({
      TableName: "ApplicationsTable",
      IndexName: "GSIREVIEWS",
      KeyConditionExpression: "gsi1pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "REVIEW" },
      },
      ScanIndexForward: false,
    });
    const data = await client.send(readCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "review successfully recieved",
        data: data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(readReviewHandler).onError((request) => {
  const message = request.error?.message || "Something went wrong";

  const authErrors = [
    "Missing Authorization header",
    "Invalid Authorization format",
    "Missing token",
    "Unauthorized",
  ];

  const validationDetails = request.error?.cause?.data || null;
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
