// import "./AuthSkelleton.css";
// import { useState } from "react";

// import Box from "@mui/material/Box";
// import TextField from "@mui/material/TextField";
// import InputAdornment from "@mui/material/InputAdornment";
// import IconButton from "@mui/material/IconButton";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Divider from "@mui/material/Divider";
// import Link from "@mui/material/Link";

// import PersonIcon from "@mui/icons-material/Person";
// import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
// import EmailIcon from "@mui/icons-material/Email";
// import LockIcon from "@mui/icons-material/Lock";
// import Visibility from "@mui/icons-material/Visibility";
// import VisibilityOff from "@mui/icons-material/VisibilityOff";
// import GoogleIcon from "@mui/icons-material/Google";

// const AuthSkelleton = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);

//   return (
//     <div className="authSkelleton">
//       <h1>Sign up</h1>

//       <Box
//         component="form"
//         sx={{
//           display: "flex",
//           flexDirection: "column",
//           gap: 2,
//           // width: 320,
//         }}
//         autoComplete="off"
//       >
//         {/* USERNAME */}
//         <TextField
//           label="Username"
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <AlternateEmailIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* NAME */}
//         <TextField
//           label="Name"
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <PersonIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* EMAIL */}
//         <TextField
//           label="Email"
//           type="email"
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <EmailIcon />
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* PASSWORD */}
//         <TextField
//           label="Password"
//           type={showPassword ? "text" : "password"}
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockIcon />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => setShowPassword(!showPassword)}
//                   edge="end"
//                 >
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* CONFIRM PASSWORD */}
//         <TextField
//           label="Confirm Password"
//           type={showConfirmPassword ? "text" : "password"}
//           variant="outlined"
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <LockIcon />
//               </InputAdornment>
//             ),
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton
//                   onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                   edge="end"
//                 >
//                   {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         {/* SIGN UP BUTTON */}
//         <Button variant="contained" size="large">
//           Sign up
//         </Button>

//         {/* OR DIVIDER */}
//         <Divider>or sign up with</Divider>

//         {/* GOOGLE BUTTON */}
//         <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
//           Continue with Google
//         </Button>

//         {/* LOGIN LINK */}
//         <Typography variant="body2" align="center">
//           Already have an account? <Link href="/login">Login</Link>
//         </Typography>

//         {/* TERMS TEXT */}
//         <Typography variant="caption" align="center" sx={{ color: "gray" }}>
//           By clicking Sign up or continuing with Google, you agree to our Terms
//           of Service and Privacy Policy.
//         </Typography>
//       </Box>
//     </div>
//   );
// };

// export default AuthSkelleton;
import "./AuthSkelleton.css";
import { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import Link from "@mui/material/Link";

import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import GoogleIcon from "@mui/icons-material/Google";

const AuthSkelleton = ({ mode = "signup" }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // mode = "signup" eller "login"
  const isSignup = mode === "signup";

  return (
    <div className="authSkelleton">
      <h1 className="authSkelleton__header">
        {isSignup ? "Sign up" : "Login"}
      </h1>

      <Box
        component="form"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
        }}
        autoComplete="off"
      >
        {/* USERNAME & NAME bara för signup */}
        {isSignup && (
          <>
            <TextField
              label="Username"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Name"
              variant="outlined"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </>
        )}

        {/* EMAIL */}
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EmailIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* PASSWORD */}
        <TextField
          label="Password"
          type={showPassword ? "text" : "password"}
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <LockIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        {/* CONFIRM PASSWORD bara för signup */}
        {isSignup && (
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}

        {/* BUTTON */}
        <Button variant="contained" size="large">
          {isSignup ? "Sign up" : "Login"}
        </Button>

        {/* OR DIVIDER */}
        <Divider>{isSignup ? "or sign up with" : "or login with"}</Divider>

        {/* GOOGLE BUTTON */}
        <Button variant="outlined" startIcon={<GoogleIcon />} fullWidth>
          {isSignup ? "Continue with Google" : "Login with Google"}
        </Button>

        {/* LINK mellan login/signup */}
        <Typography variant="body2" align="center">
          {isSignup ? (
            <>
              Already have an account?{" "}
              <Link component={RouterLink} to="/login">
                Login
              </Link>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/signup">
                Sign up
              </Link>
            </>
          )}
        </Typography>

        {/* TERMS TEXT bara för signup */}
        {isSignup && (
          <Typography variant="caption" align="center" sx={{ color: "gray" }}>
            By clicking Sign up or continuing with Google, you agree to our
            Terms of Service and Privacy Policy.
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default AuthSkelleton;
