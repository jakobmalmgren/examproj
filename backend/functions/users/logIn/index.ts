import httpJsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import { SignJWT } from "jose";
import { findUser } from "../../../services/users/userService.js";
import { comparePassword } from "../../../utils/bcrypt/bcrypt.js";
import { transpileSchema } from "@middy/validator/transpile";
import { loginSchema } from "../../../middlewares/schemas/loginSchema.js";
import validator from "@middy/validator";

const loginHandler = async (event) => {
  const { username, password } = event.body;
  const secret = process.env.JWT_SECRET;

  try {
    // Hämta användaren från DynamoDB
    const user = await findUser(username);
    console.log("USER!!", user);

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "wrong credentials" }),
      };
    }

    // Jämför lösenord
    const matchedPassword = await comparePassword(password, user.password.S);
    if (!matchedPassword) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "wrong credentials" }),
      };
    }

    // Skapa token med jose
    const token = await new SignJWT({
      username: user.username,
      email: user.email,
      name: user.name,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(new TextEncoder().encode(secret));

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        success: true,
        token,
        user: { username: user.username, name: user.name, email: user.email },
      }),
    };
  } catch (err) {
    console.error(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(loginHandler)
  .use(httpJsonBodyParser())
  .use(validator({ eventSchema: transpileSchema(loginSchema) }))
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
