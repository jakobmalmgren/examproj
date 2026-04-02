import { useState } from "react";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import AuthSkelleton from "../AuthSkelleton/AuthSkelleton";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { signup } from "../../apis/auth";
import type { SnackbarState } from "../../frontendTypes/frontendTypes";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [snackbar, setSnackbar] = useState<SnackbarState>({
    open: false,
    message: "",
    severity: "success",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCloseSnackbar = () => {
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const result = await signup(form);

      if (!result.success) {
        if (result.status === 400 || result.status === 409) {
          setSnackbar({
            open: true,
            message: result.message || "Signup failed",
            severity: "error",
          });
        }
        return;
      }

      setForm({
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setSnackbar({
        open: true,
        message: result.message || "Account created successfully!",
        severity: "success",
      });
    } catch (err) {
      setSnackbar({
        open: true,
        message: err instanceof Error ? err.message : "Network error",
        severity: "error",
      });
    }
  };
  return (
    <AuthSkelleton title="Signup" onSubmit={handleSignup}>
      <TextField
        label="Username"
        name="username"
        value={form.username}
        onChange={handleChange}
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
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        variant="outlined"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="primary" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        label="Password"
        name="password"
        type={showPassword ? "text" : "password"}
        value={form.password}
        onChange={handleChange}
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

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type={showConfirmPassword ? "text" : "password"}
        value={form.confirmPassword}
        onChange={handleChange}
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
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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

export default SignUp;
