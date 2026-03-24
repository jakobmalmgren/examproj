import { hashPassword } from "../../../utils/bcrypt/bcrypt";
import {
  checkIfUsernameExists,
  checkEmailExists,
} from "../../../services/users/userService";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { client } from "../../../config/dj";
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
      body: JSON.stringify({ message: "Passwords do not match" }),
    };
  }

  try {
    const usernameExists = await checkIfUsernameExists(username);
    console.log("Username exists?", usernameExists);

    if (usernameExists) {
      return {
        statusCode: 409,
        body: JSON.stringify({ message: "Username already exists" }),
      };
    }

    const EmailExists = await checkEmailExists(email);
    if (EmailExists) {
      return {
        statusCode: 409,
        body: JSON.stringify({ message: "Email already exists" }),
      };
    }

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

// export const handler = middy(signUpHandler).use(httpJsonBodyParser());
export const handler = middy(signUpHandler)
  .use(httpJsonBodyParser()) // parse JSON body
  .use(validator({ eventSchema: transpileSchema(signUpSchema) })) // validera inputs
  .onError((request) => {
    // request.error innehåller validator-felet
    request.response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Input validation failed",
        details: request.error?.details || request.error?.message,
      }),
    };
  });
