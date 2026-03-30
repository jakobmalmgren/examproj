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
    request.response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Input validation failed",
        details: request.error?.details || request.error?.message,
      }),
    };
  });
