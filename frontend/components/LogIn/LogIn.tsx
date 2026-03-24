import AuthSkelleton from "../AuthSkelleton/AuthSkelleton";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { login } from "../../apis/auth";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom";

const LogIn = ({ setIsLoggedIn }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ username: "", password: "" });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    try {
      const result = await login(form);
      console.log("result", result);

      if (result.success) {
        setForm({ username: "", password: "" });
        setIsLoggedIn(true); // sätt användaren som inloggad
        navigate("/home", { replace: true }); // navigera direkt
      } else {
        setSnackbar({
          open: true,
          message: result.message || "Login failed",
          severity: "error",
        });
      }
    } catch (err) {
      setSnackbar({
        open: true,
        message: "Network error",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthSkelleton title="Login" onSubmit={handleLogin} loading={loading}>
      <TextField
        label="Username"
        onChange={handleChange}
        name="username"
        value={form.username}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AlternateEmailIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password"
        onChange={handleChange}
        name="password"
        value={form.password}
        type={showPassword ? "text" : "password"}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                color="primary"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </AuthSkelleton>
  );
};

export default LogIn;
