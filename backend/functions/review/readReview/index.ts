import middy from "@middy/core";
import { client } from "../../../config/dj";
import { QueryCommand } from "@aws-sdk/client-dynamodb";
import { checkAuth } from "../../../middlewares/auth/checkAuth";

const readReviewHandler = async (event) => {
  const user = event.user;
  console.log("USER", user);

  try {
    const readCommand = new QueryCommand({
      TableName: "ApplicationsTable",
      IndexName: "GSIREVIEWS",
      KeyConditionExpression: "gsi1pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: "REVIEW" },
      },
      ScanIndexForward: false,
    });
    const data = await client.send(readCommand);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "review successfully recieved",
        data: data,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Internal server error" }),
    };
  }
};

export const handler = middy(readReviewHandler)
  // .use(checkAuth())
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
