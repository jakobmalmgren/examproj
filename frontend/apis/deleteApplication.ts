const API_BASE_URL = "https://b33x42qde1.execute-api.eu-north-1.amazonaws.com";

export const deleteApplication = async (id) => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const resData = await response.json();
    console.log("resdata read", resData);
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
