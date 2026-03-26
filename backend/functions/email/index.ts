import { sendReminderEmail } from "../../services/email/sendReminderEmail";
import middy from "@middy/core";
export const sendEmail = async () => {
  try {
    await sendReminderEmail(
      "din-verifierade-mail@gmail.com",
      "Frontend Developer",
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        message: "Mail sent",
      }),
    };
  } catch (error) {
    console.error("SES error:", error);

    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: "Mail failed",
        error,
      }),
    };
  }
};

export const handler = middy(sendEmail);
