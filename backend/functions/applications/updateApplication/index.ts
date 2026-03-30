// import middy from "@middy/core";
// import httpJsonBodyParser from "@middy/http-json-body-parser";
// import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
// import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
// import { checkAuth } from "../../../middlewares/auth/checkAuth";
// import { client } from "../../../config/dj";
// import { s3 } from "../../../config/s3Files";

// const BUCKET_NAME = "my-app-files-123xyz-136191772737-eu-north-1-an";

// const updateApplication = async (event) => {
//   const { id } = event.pathParameters || {};
//   const user = event.user;
//   const username = user.username.S;

//   const pk = `USERNAME#${username}`;
//   const sk = `APPLICATION#${id}`;

//   const {
//     title,
//     extraInfo,
//     applicationDate,
//     priority,
//     reminder,
//     reminderDate,
//     files,
//     removedFileKeys = [],
//     location,
//     category,
//   } = event.body;

//   if (!id) {
//     return {
//       statusCode: 400,
//       body: JSON.stringify({
//         success: false,
//         message: "Missing application id",
//       }),
//     };
//   }

//   //   if (!title || !category) {
//   //     return {
//   //       statusCode: 400,
//   //       body: JSON.stringify({
//   //         success: false,
//   //         message: "Title and category are required",
//   //       }),
//   //     };
//   //   }

//   try {
//     // Kolla först att application finns och tillhör användaren
//     const existingApplication = await client.send(
//       new GetCommand({
//         TableName: "ApplicationsTable",
//         Key: {
//           pk,
//           sk,
//         },
//       }),
//     );

//     if (!existingApplication.Item) {
//       return {
//         statusCode: 404,
//         body: JSON.stringify({
//           success: false,
//           message: "Application not found",
//         }),
//       };
//     }

//     // Om användaren har tagit bort filer i edit-läget, radera dem från S3
//     if (removedFileKeys.length > 0) {
//       await s3.send(
//         new DeleteObjectsCommand({
//           Bucket: BUCKET_NAME,
//           Delete: {
//             Objects: removedFileKeys.map((key) => ({ Key: key })),
//           },
//         }),
//       );
//     }

//     const updatedAt = new Date().toISOString();

//     await client.send(
//       new UpdateCommand({
//         TableName: "ApplicationsTable",
//         Key: {
//           pk,
//           sk,
//         },
//         UpdateExpression: `
//           SET title = :title,
//               extraInfo = :extraInfo,
//               applicationDate = :applicationDate,
//               priority = :priority,
//               reminder = :reminder,
//               reminderDate = :reminderDate,
//               files = :files,
//               #location = :location,
//               category = :category,
//               updatedAt = :updatedAt
//         `,
//         ExpressionAttributeNames: {
//           "#location": "location",
//         },
//         ExpressionAttributeValues: {
//           ":title": title.trim(),
//           ":extraInfo": extraInfo || [],
//           ":applicationDate": applicationDate || null,
//           ":priority": priority ?? 1,
//           ":reminder": reminder ?? false,
//           ":reminderDate": reminder ? reminderDate || null : null,
//           ":files": files || [],
//           ":location": location || {
//             city: "",
//             latitude: null,
//             longitude: null,
//           },
//           ":category": category.trim(),
//           ":updatedAt": updatedAt,
//         },
//       }),
//     );

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         success: true,
//         message: "Application updated successfully",
//       }),
//     };
//   } catch (error) {
//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         success: false,
//         message: "Failed to update application",
//         error: error.message,
//       }),
//     };
//   }
// };

// export const handler = middy(updateApplication)
//   .use(httpJsonBodyParser())
//   .use(checkAuth())
//   .onError((request) => {
//     request.response = {
//       statusCode: 400,
//       body: JSON.stringify({
//         success: false,
//         message: "Failed to update application",
//         details: request.error?.details || request.error?.message,
//       }),
//     };
//   });

// // fixa schema me sen!!!

import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { client } from "../../../config/dj";
import { s3 } from "../../../config/s3Files";

const BUCKET_NAME = "my-app-files-123xyz-136191772737-eu-north-1-an";

const updateApplication = async (event) => {
  const { id } = event.pathParameters || {};
  const user = event.user;
  const username = user.username.S;

  const pk = `USERNAME#${username}`;
  const sk = `APPLICATION#${id}`;

  const {
    title,
    extraInfo,
    applicationDate,
    priority,
    reminder,
    reminderDate,
    files,
    removedFileKeys = [],
    location,
    category,
  } = event.body;

  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Missing application id",
      }),
    };
  }

  try {
    const existingApplication = await client.send(
      new GetCommand({
        TableName: "ApplicationsTable",
        Key: {
          pk,
          sk,
        },
      }),
    );

    if (!existingApplication.Item) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          success: false,
          message: "Application not found",
        }),
      };
    }

    if (removedFileKeys.length > 0) {
      await s3.send(
        new DeleteObjectsCommand({
          Bucket: BUCKET_NAME,
          Delete: {
            Objects: removedFileKeys.map((key) => ({ Key: key })),
          },
        }),
      );
    }

    const updatedAt = new Date().toISOString();
    const finalReminder = !!reminder;
    const finalReminderDate = finalReminder ? reminderDate || null : null;

    await client.send(
      new UpdateCommand({
        TableName: "ApplicationsTable",
        Key: {
          pk,
          sk,
        },
        UpdateExpression: `
          SET title = :title,
              extraInfo = :extraInfo,
              applicationDate = :applicationDate,
              priority = :priority,
              reminder = :reminder,
              reminderDate = :reminderDate,
              send = :send,
              files = :files,
              #location = :location,
              category = :category,
              updatedAt = :updatedAt
        `,
        ExpressionAttributeNames: {
          "#location": "location",
        },
        ExpressionAttributeValues: {
          ":title": title?.trim() || "",
          ":extraInfo": extraInfo || [],
          ":applicationDate": applicationDate || null,
          ":priority": priority ?? 1,
          ":reminder": finalReminder,
          ":reminderDate": finalReminderDate,
          ":send": false,
          ":files": files || [],
          ":location": location || {
            city: "",
            latitude: null,
            longitude: null,
          },
          ":category": category?.trim() || "",
          ":updatedAt": updatedAt,
        },
      }),
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Application updated successfully",
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Failed to update application",
        error: error.message,
      }),
    };
  }
};

export const handler = middy(updateApplication)
  .use(httpJsonBodyParser())
  .use(checkAuth())
  .onError((request) => {
    request.response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Failed to update application",
        details: request.error?.details || request.error?.message,
      }),
    };
  });
