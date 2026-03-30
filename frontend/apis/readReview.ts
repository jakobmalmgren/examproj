const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";
export const readReview = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/review`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: resData.message,
      };
    }
    return {
      success: true,
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
