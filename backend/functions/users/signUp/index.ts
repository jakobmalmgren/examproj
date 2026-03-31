import { hashPassword } from "../../../utils/bcrypt/bcrypt";
import {
  checkIfUsernameExists,
  checkEmailExists,
} from "../../../services/users/userService";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../../config/db";
import middy from "@middy/core";
import { transpileSchema } from "@middy/validator/transpile";
import validator from "@middy/validator";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { signUpSchema } from "../../../middlewares/schemas/signUpSchema";
const signUpHandler = async (event) => {
  const { username, email, password, confirmPassword } = event.body;

  if (password !== confirmPassword) {
    return {
      statusCode: 400,
      success: false,
      body: JSON.stringify({ message: "Passwords do not match" }),
    };
  }

  try {
    const usernameExists = await checkIfUsernameExists(username);

    if (usernameExists) {
      return {
        statusCode: 409,
        success: false,
        body: JSON.stringify({ message: "Username already exists" }),
      };
    }

    const EmailExists = await checkEmailExists(email);
    if (EmailExists) {
      return {
        statusCode: 409,
        success: false,
        body: JSON.stringify({ message: "Email already exists" }),
      };
    }

    console.log("EmailExists", EmailExists);

    const hashedPassword = await hashPassword(password);

    const putCommand = new PutItemCommand({
      TableName: "ApplicationsTable",
      Item: {
        pk: { S: `USERNAME#${username}` },
        sk: { S: `PROFILE#` },
        username: { S: username },
        email: { S: email },
        password: { S: hashedPassword },
        createdAt: { S: new Date().toISOString() },
      },
    });

    await client.send(putCommand);

    return {
      statusCode: 201,
      success: true,
      body: JSON.stringify({ message: "Account created successfully" }),
    };
  } catch (err) {
    console.error("Error creating account:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(signUpHandler)
  .use(httpJsonBodyParser()) // parse JSON body
  .use(validator({ eventSchema: transpileSchema(signUpSchema) })) // validera inputs
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
