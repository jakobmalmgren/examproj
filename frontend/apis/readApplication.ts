const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const readApplication = async () => {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE_URL}/api/applications`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const resData = await response.json();

    if (!response.ok) {
      return {
        success: false,
        status: response.status,
        message: resData.message,
      };
    }

    return {
      success: true,
      status: response.status,
      data: resData.data,
    };
  } catch (err) {
    return {
      success: false,
      message: "Network or server error",
      error: err,
    };
  }
};
