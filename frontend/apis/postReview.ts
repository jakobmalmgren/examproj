// const API_BASE_URL = "https://b33x42qde1.execute-api.eu-north-1.amazonaws.com";
const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";
export const postReview = async (data) => {
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
