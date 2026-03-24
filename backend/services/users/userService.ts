import {
  GetItemCommand,
  QueryCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { client } from "../../config/dj";

export const checkIfUsernameExists = async (username: string) => {
  try {
    const command = new QueryCommand({
      TableName: "ApplicationsTable",
      KeyConditionExpression: "pk = :pk",
      ExpressionAttributeValues: {
        ":pk": { S: `USERNAME#${username}` },
      },
      Limit: 1,
    });

    const result = await client.send(command);
    console.log("result", result);
    // return result;
    const count = result.Count ?? 0;
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};

export const checkEmailExists = async (email: string) => {
  try {
    const command = new ScanCommand({
      TableName: "ApplicationsTable",
      FilterExpression: "email = :email",
      ExpressionAttributeValues: {
        ":email": { S: email },
      },
      Limit: 1,
    });

    const result = await client.send(command);
    const count = result.Count ?? 0;
    if (count > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
  }
};
export const findUser = async (username: string) => {
  try {
    const command = new GetItemCommand({
      TableName: "ApplicationsTable",
      Key: {
        pk: { S: `USERNAME#${username}` },
        sk: { S: "PROFILE#" },
      },
    });
    const result = await client.send(command);
    console.log("RESSUUULLT!!!!!!!!!!!!!!", result);
    return result.Item;
  } catch (error) {
    console.error(error);
  }
};
