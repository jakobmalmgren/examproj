import "./AuthSkelleton.css";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import { type AuthSkelletonProps } from "./types/types";
import { useTheme } from "@mui/material/styles";
import { CircularProgress } from "@mui/material";

const AuthSkelleton = ({
  children,
  title,
  onSubmit,
  loading,
}: AuthSkelletonProps) => {
  const isLogin = title.toLowerCase() === "login";
  const theme = useTheme();

  return (
    <div className="authSkelleton">
      <h1
        className="authSkelleton__header"
        style={{ color: theme.palette.primary.main }}
      >
        {title}
      </h1>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
        autoComplete="off"
        onSubmit={onSubmit}
      >
        {children}

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={loading}
          sx={{
            position: "relative",
            bgcolor: "primary.main",
            color: "white",
            "&:disabled": {
              bgcolor: "primary.main",
            },
          }}
        >
          {title}
          {loading && (
            <CircularProgress
              size={20}
              color="inherit"
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                marginTop: "-10px",
                marginLeft: "-10px",
              }}
            />
          )}
        </Button>

        <Divider>or login with</Divider>

        <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
          Login with Google
        </Button>

        <Typography variant="body2" align="center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/auth/signup" underline="none">
                Signup
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link component={RouterLink} to="/auth/login" underline="none">
                Login
              </Link>
            </>
          )}
        </Typography>

        <Typography variant="caption" align="center" sx={{ color: "gray" }}>
          By clicking {title} or continuing with Google, you agree to our Terms
          of Service and Privacy Policy.
        </Typography>
      </Box>
    </div>
  );
};

export default AuthSkelleton;
