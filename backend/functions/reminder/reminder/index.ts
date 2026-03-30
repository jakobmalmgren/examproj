// import { ScanCommand, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
// import nodemailer from "nodemailer";
// import middy from "@middy/core";
// import httpJsonBodyParser from "@middy/http-json-body-parser";
// import { client } from "../../../config/dj";

// const TABLE_NAME = "ApplicationsTable";

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_APP_PASSWORD,
//   },
// });

// const reminder = async () => {
//   const today = new Date().toISOString().slice(0, 10);

//   try {
//     const result = await client.send(
//       new ScanCommand({
//         TableName: TABLE_NAME,
//         FilterExpression:
//           "reminder = :r AND #send = :s AND reminderDate <= :today",
//         ExpressionAttributeNames: {
//           "#send": "send",
//         },
//         ExpressionAttributeValues: {
//           ":r": true,
//           ":s": false,
//           ":today": today,
//         },
//       }),
//     );

//     const items = result.Items || [];
//     console.log("Found reminders:", items.length);

//     for (const item of items) {
//       const profileResult = await client.send(
//         new GetCommand({
//           TableName: TABLE_NAME,
//           Key: {
//             pk: item.pk,
//             sk: "PROFILE#",
//           },
//         }),
//       );

//       const email = profileResult.Item?.email;

//       if (!email) {
//         console.log("No email found for user:", item.pk);
//         continue;
//       }

//       await transporter.sendMail({
//         from: process.env.GMAIL_USER,
//         to: email,
//         subject: `Reminder: ${item.title || "Application"}`,
//         text: `Påminnelse för ${item.title || "din ansökan"} med datum ${item.reminderDate}.`,
//       });

//       await client.send(
//         new UpdateCommand({
//           TableName: TABLE_NAME,
//           Key: {
//             pk: item.pk,
//             sk: item.sk,
//           },
//           UpdateExpression: "SET #send = :true, reminderSentAt = :sentAt",
//           ExpressionAttributeNames: {
//             "#send": "send",
//           },
//           ExpressionAttributeValues: {
//             ":true": true,
//             ":sentAt": new Date().toISOString(),
//           },
//         }),
//       );

//       console.log(`Mail sent to ${email} for ${item.sk}`);
//     }

//     return {
//       statusCode: 200,
//       body: JSON.stringify({
//         success: true,
//         checked: items.length,
//       }),
//     };
//   } catch (error) {
//     console.error("Reminder job failed:", error);

//     return {
//       statusCode: 500,
//       body: JSON.stringify({
//         success: false,
//         message: "Reminder job failed",
//         error: error.message,
//       }),
//     };
//   }
// };

// export const handler = middy(reminder)
//   .use(httpJsonBodyParser())
//   .onError((request) => {
//     request.response = {
//       statusCode: 400,
//       body: JSON.stringify({
//         success: false,
//         message: "Input validation failed",
//         details: request.error?.details || request.error?.message,
//       }),
//     };
//   });
import { ScanCommand, UpdateCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import nodemailer from "nodemailer";
import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { client } from "../../../config/dj";

const TABLE_NAME = "ApplicationsTable";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const reminder = async () => {
  const today = new Date().toISOString().slice(0, 10);
  console.log("TODAY:", today);

  try {
    const result = await client.send(
      new ScanCommand({
        TableName: TABLE_NAME,
        FilterExpression:
          "reminder = :r AND #send = :s AND reminderDate <= :today",
        ExpressionAttributeNames: {
          "#send": "send",
        },
        ExpressionAttributeValues: {
          ":r": true,
          ":s": false,
          ":today": today,
        },
      }),
    );

    const items = result.Items || [];
    console.log("Found reminders:", items.length);
    console.log("Reminder items:", JSON.stringify(items, null, 2));

    for (const item of items) {
      console.log("Checking item:", JSON.stringify(item, null, 2));

      const profileResult = await client.send(
        new GetCommand({
          TableName: TABLE_NAME,
          Key: {
            pk: item.pk,
            sk: "PROFILE#",
          },
        }),
      );

      console.log("Profile result:", JSON.stringify(profileResult, null, 2));

      const email = profileResult.Item?.email;
      console.log("Resolved email:", email);

      if (!email) {
        console.log("No email found for user:", item.pk);
        continue;
      }

      const mailResult = await transporter.sendMail({
        from: process.env.GMAIL_USER,
        to: email,
        subject: `Reminder: ${item.title || "Application"}`,
        text: `Påminnelse för ${item.title || "din ansökan"} med datum ${item.reminderDate}.`,
      });

      console.log("Mail result:", JSON.stringify(mailResult, null, 2));

      await client.send(
        new UpdateCommand({
          TableName: TABLE_NAME,
          Key: {
            pk: item.pk,
            sk: item.sk,
          },
          UpdateExpression: "SET #send = :true, reminderSentAt = :sentAt",
          ExpressionAttributeNames: {
            "#send": "send",
          },
          ExpressionAttributeValues: {
            ":true": true,
            ":sentAt": new Date().toISOString(),
          },
        }),
      );

      console.log(`Mail sent to ${email} for ${item.sk}`);
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        checked: items.length,
      }),
    };
  } catch (error: any) {
    console.error("Reminder job failed:", error);
    console.error("Reminder job failed message:", error?.message);
    console.error("Reminder job failed stack:", error?.stack);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Reminder job failed",
        error: error.message,
      }),
    };
  }
};

export const handler = async () => {
  return reminder();
};
