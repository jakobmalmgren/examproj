import middy from "@middy/core";
import { client } from "../../../config/dj";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { v4 as uuidv4 } from "uuid";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";

const createApplication = async (event) => {
  console.log("BODY", event.body);

  const {
    title,
    extraInfo,
    category,
    reminder,
    reminderDate,
    files,
    location,
    priority,
  } = event.body;

  const user = event.user;
  const username = user.username.S;

  try {
    const putCommand = new PutItemCommand({
      TableName: "ApplicationsTable",
      Item: {
        pk: { S: `USERNAME#${username}` },
        sk: { S: `APPLICATION#${uuidv4()}` },

        title: { S: title || "" },
        category: { S: category || "" },

        extraInfo: {
          L: (extraInfo || []).map((item) => ({ S: item })),
        },

        priority: { N: String(priority ?? 0) },

        reminder: { BOOL: !!reminder },

        reminderDate: reminderDate ? { S: reminderDate } : { NULL: true },

        // files: {
        //   L: (files || []).map((file) => ({
        //     S: typeof file === "string" ? file : JSON.stringify(file),
        //   })),
        // },

        files: {
          L: (files || []).map((file) => ({
            M: {
              name: { S: file.name },
              url: { S: file.url },
              key: { S: file.key },
              contentType: { S: file.contentType },
            },
          })),
        },

        location: {
          M: {
            city: { S: location?.city || "" },
            latitude:
              location?.latitude !== null && location?.latitude !== undefined
                ? { N: String(location.latitude) }
                : { NULL: true },
            longitude:
              location?.longitude !== null && location?.longitude !== undefined
                ? { N: String(location.longitude) }
                : { NULL: true },
          },
        },

        createdAt: { S: new Date().toISOString() },
      },
    });

    await client.send(putCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Application created!",
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

export const handler = middy(createApplication)
  .use(httpJsonBodyParser())
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
