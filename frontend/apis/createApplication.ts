import type { CreateApplicationRequest } from "../sharedTypes/types";

const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const createApplication = async (data: CreateApplicationRequest) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const resData = await response.json();

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: resData.message,
      details: resData.details,
    };
  }

  return {
    success: true,
    status: response.status,
    ...resData,
  };
};
