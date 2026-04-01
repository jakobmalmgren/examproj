const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const login = async ({ username, password }) => {
  const response = await fetch(`${API_BASE_URL}/api/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: data.message || "Login failed",
      details: data.details,
    };
  }

  return {
    success: true,
    status: response.status,
    ...data,
  };
};

export const signup = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  const response = await fetch(`${API_BASE_URL}/api/user/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password, confirmPassword }),
  });

  const data = await response.json();

  if (!response.ok) {
    return {
      success: false,
      status: response.status,
      message: data.message || "Signup failed",
      details: data.details,
    };
  }

  return {
    success: true,
    status: response.status,
    ...data,
  };
};
