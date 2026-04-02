import { FormRequest } from "../sharedTypes/types";

const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const postReview = async (data: FormRequest) => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log("DAAAATA", resData);

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
  } catch (error) {
    return {
      success: false,
      message: "Network or server error",
      error: error,
    };
  }
};
