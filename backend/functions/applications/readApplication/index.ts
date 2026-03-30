import middy from "@middy/core";
import { client } from "../../../config/db";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { QueryCommand } from "@aws-sdk/lib-dynamodb";

const readApplication = async (event) => {
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

export const handler = middy(readApplication)
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
