import middy from "@middy/core";
import { client } from "../../../config/db";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { DeleteCommand } from "@aws-sdk/lib-dynamodb";

const deleteApplication = async (event) => {
  const userName = event.user.username.S;
  const id = event.pathParameters.id;

  try {
    const command = new DeleteCommand({
      TableName: "ApplicationsTable",
      Key: {
        pk: `USERNAME#${userName}`,
        sk: `APPLICATION#${id}`,
      },
    });

    await client.send(command);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Application deleted succesfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
};

export const handler = middy(deleteApplication)
  .use(checkAuth())
  .onError((request) => {
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
