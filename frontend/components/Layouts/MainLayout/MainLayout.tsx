import ReviewForm from "../../Review/ReviewForm";
import Carousel from "../../Carousel/Carousel";
import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Backdrop from "@mui/material/Backdrop";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import RoomIcon from "@mui/icons-material/Room";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { keyframes } from "@mui/system";
import ReviewDrawer from "../../Review/ReviewDrawer";

const pulse = keyframes`
  0% {
    transform: scale(1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }
  50% {
    transform: scale(1.04);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.24);
  }
  100% {
    transform: scale(1);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }
`;

const navItems = [
  { text: "My Applications", icon: <HomeIcon />, path: "/home" },
  { text: "Add Application", icon: <AddIcon />, path: "/add" },
  { text: "Statistics", icon: <BarChartIcon />, path: "/stats" },
  { text: "Map", icon: <RoomIcon />, path: "/map" },
];

const MainLayout = ({ setIsLoggedIn }) => {
  const [reviewModalOpen, setReviewModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <Box
      className="mainLayout"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.appBar + 3 }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            height: "70px",
            padding: "10px",
          }}
        >
          <Typography
            variant="h6"
            component={RouterLink}
            to="/home"
            sx={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
              display: "flex",
            }}
          >
            <img
              src="/images/1.png"
              alt="RMA Logo"
              style={{ height: "45px", width: "45px", borderRadius: "50%" }}
            />
          </Typography>

          <Box
            sx={{
              display: { md: "flex" },
              gap: 2,
              justifyContent: "center",
              width: "fit-content",
              mx: "auto",
              backgroundColor: "white",
              borderRadius: "999px",
            }}
          >
            {navItems.map((item) => (
              <Tooltip
                key={item.text}
                title={item.text}
                arrow
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "black",
                      color: "white",
                      fontSize: 12,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                    },
                  },
                  arrow: {
                    sx: {
                      color: "black",
                    },
                  },
                }}
              >
                <IconButton
                  component={RouterLink}
                  to={item.path}
                  color="primary"
                  size="large"
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <IconButton sx={{ color: "inherit" }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {!isMobile && <ReviewDrawer />}
      </AppBar>

      {isMobile && (
        <>
          <Backdrop
            open={reviewModalOpen}
            onClick={() => setReviewModalOpen(false)}
            sx={{
              zIndex: (theme) => theme.zIndex.appBar + 1,
              backgroundColor: "rgba(0,0,0,0.45)",
            }}
          />

          <Box
            sx={{
              position: "fixed",
              top: "70px",
              left: "50%",
              width: "min(92vw, 520px)",
              transform: reviewModalOpen
                ? "translateX(-50%) translateY(0)"
                : "translateX(-50%) translateY(calc(-100% + 26px))",
              transition: "transform 350ms ease",
              zIndex: (theme) => theme.zIndex.appBar + 2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                width: "100%",
                overflow: "hidden",
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
              }}
            >
              <ReviewForm open={reviewModalOpen} />
            </Box>

            <Box
              onClick={() => setReviewModalOpen((prev) => !prev)}
              sx={{
                height: "26px",
                minHeight: "26px",
                width: "52px",
                backgroundColor: "primary.main",
                color: "white",
                borderTopLeftRadius: 0,
                borderTopRightRadius: 0,
                borderBottomLeftRadius: 18,
                borderBottomRightRadius: 18,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                userSelect: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.18)",
                animation: reviewModalOpen
                  ? "none"
                  : `${pulse} 1.8s ease-in-out infinite`,
              }}
            >
              <RateReviewIcon sx={{ fontSize: 18 }} />
            </Box>
          </Box>
        </>
      )}

      <Box
        sx={{
          position: "fixed",
          bottom: 8,
          left: 0,
          right: 0,
          px: 1,
          width: "100%",
          zIndex: (theme) => theme.zIndex.appBar,
          pointerEvents: "auto",
          boxSizing: "border-box",
        }}
      >
        <Box
          sx={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <Carousel />
        </Box>
      </Box>

      <Box
        className="mainLayout__content"
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: { xs: "56px", sm: "64px" },
          // mb: { xs: "110px", sm: "120px" },
          // backgroundColor: "red",
          // padding: "30px",
          // position: "relative",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};

export default MainLayout;
