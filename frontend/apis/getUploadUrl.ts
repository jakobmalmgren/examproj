const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";
export const getUploadUrl = async ({
  fileName,
  fileType,
}: {
  fileName: string;
  fileType: string;
}) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/files/upload-url`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      fileName,
      fileType,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to get upload URL");
  }

  return data;
};
