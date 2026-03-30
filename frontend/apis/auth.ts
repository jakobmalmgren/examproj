const API_BASE_URL = "https://x7nm2264aj.execute-api.eu-north-1.amazonaws.com";

export const login = async ({ username, password }) => {
  try {
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
        message: data.message || "Login failed",
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (err) {
    console.error("Login error:", err);
    return {
      success: false,
      message: "Network or server error",
    };
  }
};

export const signup = async ({
  username,
  email,
  password,
  confirmPassword,
}) => {
  try {
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
        message: data.message || "Signup failed",
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (err) {
    console.error("Signup error:", err);
    return {
      success: false,
      message: "Network or server error",
    };
  }
};
