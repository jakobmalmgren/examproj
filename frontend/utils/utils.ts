export const checkAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (token) {
    const payload = JSON.parse(atob(token.split(".")[1]));

    const isExpired = Date.now() >= payload.exp * 1000;

    if (isExpired) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
  }
};
