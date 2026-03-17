import "./AuthSkelleton.css";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";
import GoogleIcon from "@mui/icons-material/Google";
import { type AuthSkelletonProps } from "./types/types";

const AuthSkelleton = ({ children, title }: AuthSkelletonProps) => {
  const isLogin = title.toLowerCase() === "login";

  return (
    <div className="authSkelleton">
      <h1 className="authSkelleton__header">{title}</h1>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1.5,
        }}
        autoComplete="off"
      >
        {children}

        <Button variant="contained" size="large">
          {title}
        </Button>

        <Divider>or login with</Divider>

        <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
          Login with Google
        </Button>

        <Typography variant="body2" align="center">
          {isLogin ? (
            <>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/auth/signup">
                Sign up
              </Link>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <Link component={RouterLink} to="/auth/login">
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
