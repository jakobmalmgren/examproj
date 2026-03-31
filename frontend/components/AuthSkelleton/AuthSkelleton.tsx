import "./AuthSkelleton.css";
import { Link as RouterLink } from "react-router-dom";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
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
      {/* <h1
        className="authSkelleton__header"
        style={{ color: theme.palette.primary.main }}
      >
        {title}
      </h1> */}

      <Typography
        style={{ color: theme.palette.primary.main }}
        sx={{
          fontSize: {
            xs: "20px",
            sm: "20px",
            md: "25px",
            mb: "2",
          },

          fontWeight: 600,
          mb: 2, // ✅ här
        }}
      >
        {title}
      </Typography>

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
          <span style={{ visibility: loading ? "hidden" : "visible" }}>
            {title}
          </span>
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
          By clicking {title} with RMA, you agree to our Terms of Service and
          Privacy Policy.
        </Typography>
      </Box>
    </div>
  );
};

export default AuthSkelleton;
