// const API_BASE_URL = "https://b33x42qde1.execute-api.eu-north-1.amazonaws.com";
const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const readApplication = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/applications`, {
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

    // varför ...resdata o inte bara message: resData?
    return {
      success: true,
      ...resData,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network or server error",
      error: err,
    };
  }
};
