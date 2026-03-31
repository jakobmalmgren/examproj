import Carousel from "../../components/Carousel/Carousel";
import { Outlet } from "react-router-dom";
import { Box, Typography } from "@mui/material";

const LogInSignUp = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          minHeight: "100vh",
        }}
      >
        {/* Vänster sida */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: { xs: "100%", md: "50%" },
            minHeight: "100vh",
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 2.5 },
          }}
        >
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: "420px", md: "500px" },
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              // gap: { xs: 1.5, sm: 2 },
            }}
          >
            <Box
              component="img"
              src="/images/rma.png"
              alt="hero"
              sx={{
                width: {
                  xs: "140px",
                  sm: "170px",
                  md: "180px",
                  lg: "180px",
                },
                maxWidth: "100%",
                height: "auto",
              }}
            />

            <Box
              sx={{
                width: "100%",
              }}
            >
              <Outlet />
            </Box>
          </Box>
        </Box>

        {/* Höger sida */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            width: "50%",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            p: { md: 2, lg: 3, xl: 4 },
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
              width: { md: "240px", lg: "300px", xl: "400px" },
              maxWidth: "80%",
              height: "auto",
              mb: { md: 1.5, lg: 2 },
            }}
          />

          <Box
            sx={{
              width: "100%",
              maxWidth: { md: "420px", lg: "520px", xl: "620px" },
            }}
          >
            <Box
              sx={{
                color: "#fff",
                textAlign: "center",
                px: { md: 2, lg: 4 },
              }}
            >
              {/* <Typography
                sx={{
                  fontSize: { md: "28px", lg: "36px", xl: "42px" },
                  fontWeight: 700,
                  lineHeight: 1.2,
                  mb: 2,
                  color: "primary.main",
                }}
              >
                Track. Apply. Succeed.
              </Typography>

              <Typography
                sx={{
                  fontSize: { md: "16px", lg: "18px" },
                  opacity: 0.85,
                  maxWidth: "500px",
                  mx: "auto",
                  color: "primary.main",
                }}
              >
                Manage all your applications in one place and stay on top of
                every opportunity.
              </Typography> */}
            </Box>
            <Carousel />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LogInSignUp;
