import { transpileSchema } from "@middy/validator/transpile";
import validator from "@middy/validator";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import middy from "@middy/core";
import { client } from "../../../config/dj";
import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { postReviewSchema } from "../../../middlewares/schemas/postReviewSchema";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { v4 as uuidv4 } from "uuid";

const postReviewHandler = async (event) => {
  const user = event.user;
  console.log("USER", user);

  const username = user.username.S;
  const id = uuidv4();

  const { name, comment, rating } = event.body;

  try {
    const putCommand = new PutItemCommand({
      TableName: "ApplicationsTable",
      Item: {
        pk: { S: `USERNAME#${username}` },
        sk: { S: `REVIEW#${id}` },
        gsi1pk: { S: "REVIEW" },
        gsi1sk: { S: new Date().toISOString() },
        name: { S: name },
        reviewId: { S: id },
        comment: { S: comment },
        rating: { N: String(rating) },
        createdAt: { S: new Date().toISOString() },
      },
    });
    await client.send(putCommand);

    return {
      statusCode: 201,
      body: JSON.stringify({ message: "review created successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(postReviewHandler)
  .use(httpJsonBodyParser()) // parse JSON body
  .use(validator({ eventSchema: transpileSchema(postReviewSchema) })) // validera inputs
  .use(checkAuth())
  .onError((request) => {
    console.log(
      "VALIDATION DETAILS:",
      JSON.stringify(request.error?.cause?.data, null, 2),
    );

    // request.error innehåller validator-felet
    request.response = {
      statusCode: 400,
      body: JSON.stringify({
        success: false,
        message: "Input validation failed",
        details: request.error?.cause?.data,
        // details: request.error?.details || request.error?.message,
      }),
    };
  });
