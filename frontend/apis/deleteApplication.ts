const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const deleteApplication = async (id) => {
  const token = localStorage.getItem("token");

  const response = await fetch(`${API_BASE_URL}/api/applications/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
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
