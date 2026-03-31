import middy from "@middy/core";
import httpJsonBodyParser from "@middy/http-json-body-parser";
import { checkAuth } from "../../../middlewares/auth/checkAuth";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "../../../config/s3Files";

const BUCKET_NAME = "my-app-files-123xyz-136191772737-eu-north-1-an";

const getUploadUrl = async (event) => {
  const { fileName, fileType } = event.body;
  const user = event.user;
  const username = user.username.S;

  try {
    const cleanFileName = fileName.replace(/\s+/g, "-");
    const fileKey = `applications/${username}/${uuidv4()}-${cleanFileName}`;

    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: fileKey,
      ContentType: fileType,
    });

    const uploadUrl = await getSignedUrl(s3, command, { expiresIn: 60 });

    const fileUrl = `https://${BUCKET_NAME}.s3.eu-north-1.amazonaws.com/${fileKey}`;

    return {
      statusCode: 200,
      body: JSON.stringify({
        success: true,
        uploadUrl,
        fileUrl,
        fileKey,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        success: false,
        message: error.message,
      }),
    };
  }
};

export const handler = middy(getUploadUrl)
  .use(httpJsonBodyParser())
  .use(checkAuth())
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
