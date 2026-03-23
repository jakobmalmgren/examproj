// import dotenv from "dotenv";
// dotenv.config(); // läser .env-filen
// import { Buffer } from "buffer";
// globalThis.Buffer = Buffer;
// import httpJsonBodyParser from "@middy/http-json-body-parser";
// import middy from "@middy/core";
// import jwt from "jsonwebtoken";
// import { findUser } from "../../../services/users/userService";
// import { comparePassword } from "../../../utils/bcrypt/bcrypt";
const { Buffer } = require("buffer"); // buffer är inbyggt
globalThis.Buffer = Buffer;
const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");
const jwt = require("jsonwebtoken");
const { findUser } = require("../../../services/users/userService");
const { comparePassword } = require("../../../utils/bcrypt/bcrypt");

const loginHandler = async (event) => {
  const { username, password } = event.body;

  try {
    const user = await findUser(username);

    if (!user) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "wrong credentials" }),
      };
    }

    const matchedPassword = await comparePassword(password, user.password);

    if (!matchedPassword) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "wrong credentials" }),
      };
    }

    const payload = {
      username: user.username,
      email: user.email,
      name: user.name,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Login successful",
        token: token,
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
// export const handler = middy(loginHandler).use(httpJsonBodyParser());
module.exports.handler = middy(loginHandler).use(httpJsonBodyParser());
