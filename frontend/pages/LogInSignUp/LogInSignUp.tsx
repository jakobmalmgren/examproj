import Carousel from "../../components/Carousel/Carousel";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";

const LogInSignUp = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        p: "10px",
      }}
    >
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            width: "50%",
          }}
        >
          <Outlet />
        </Box>

        <Box
          sx={{
            height: "100%",
            width: "50%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: "20px",
            pb: "50px",
            backgroundImage: 'url("/images/heroimg.avif")',
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <Box
            component="img"
            src="/images/rma.png"
            alt="hero"
            sx={{
              width: "70%",
              maxWidth: "100%",
              height: "auto",
              mb: "20px",
            }}
          />

          <Carousel />
        </Box>
      </Box>
    </Box>
  );
};

export default LogInSignUp;
