const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const updateApplication = async (id, data) => {
  try {
    const token = localStorage.getItem("token");
    console.log("token", token);

    const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const resData = await response.json();
    console.log("PATCH response status:", response.status);
    console.log("PATCH response data:", resData);

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
  } catch (err) {
    return {
      success: false,
      message: "Network or server error",
      error: err,
    };
  }
};
