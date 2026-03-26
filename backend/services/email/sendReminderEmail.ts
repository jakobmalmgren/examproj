import { SESv2Client, SendEmailCommand } from "@aws-sdk/client-sesv2";

const ses = new SESv2Client({
  region: process.env.AWS_REGION,
});

export const sendReminderEmail = async (to: string, title: string) => {
  const command = new SendEmailCommand({
    FromEmailAddress: process.env.SES_FROM_EMAIL!,
    Destination: {
      ToAddresses: [to],
    },
    Content: {
      Simple: {
        Subject: {
          Data: "Reminder om din ansökan",
        },
        Body: {
          Text: {
            Data: `Hej! Detta är en reminder för din ansökan: ${title}`,
          },
        },
      },
    },
  });

  return await ses.send(command);
};
