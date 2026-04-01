import ReviewForm from "../../Review/ReviewForm";
import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import RoomIcon from "@mui/icons-material/Room";
import LogoutIcon from "@mui/icons-material/Logout";
import RateReviewIcon from "@mui/icons-material/RateReview";
import Tooltip from "@mui/material/Tooltip";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import ReviewDrawer from "../../Review/ReviewDrawer";
import Carousel from "../../Carousel/Carousel";

const navItems = [
  { text: "My Applications", icon: <HomeIcon />, path: "/home" },
  { text: "Add Application", icon: <AddIcon />, path: "/add" },
  { text: "Statistics", icon: <BarChartIcon />, path: "/stats" },
  { text: "Map", icon: <RoomIcon />, path: "/map" },
];

const MainLayout = ({ setIsLoggedIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
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
      }}
    >
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
              src="/images/newIcon.png"
              alt="RMA Logo"
              style={{ height: "40px", width: "40px", borderRadius: "50%" }}
            />
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              gap: 4,
              justifyContent: "center",
              flexGrow: 1,
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
                  color="inherit"
                  size="large"
                  sx={{
                    color: "white",
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  {item.icon}
                </IconButton>
              </Tooltip>
            ))}
          </Box>

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            {isMobile && (
              <IconButton
                sx={{ color: "inherit" }}
                onClick={() => setReviewModalOpen(true)}
              >
                <RateReviewIcon />
              </IconButton>
            )}

            <IconButton sx={{ color: "inherit" }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>

            <IconButton
              color="inherit"
              edge="end"
              onClick={() => setDrawerOpen(true)}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>

        {!isMobile && <ReviewDrawer />}
      </AppBar>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        transitionDuration={{ enter: 300, exit: 300 }}
        PaperProps={{
          sx: {
            width: "100%",
            bgcolor: "white",
            borderBottomLeftRadius: 12,
            borderBottomRightRadius: 12,
            p: 1,
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-end", p: 0 }}>
          <IconButton
            onClick={() => setDrawerOpen(false)}
            sx={{ color: theme.palette.primary.main }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <List
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            gap: 1,
            pb: 2,
          }}
        >
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ width: "auto" }}>
              <Tooltip
                title={item.text}
                arrow
                placement="bottom"
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
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    color: theme.palette.primary.main,
                    "&:hover": {
                      color: "black",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      color: "inherit",
                      justifyContent: "center",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </IconButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Mobile review drawer */}
      <Drawer
        anchor="top"
        open={reviewModalOpen}
        onClose={() => setReviewModalOpen(false)}
        transitionDuration={{ enter: 300, exit: 300 }}
        PaperProps={{
          sx: {
            // width: "100%",
            minHeight: "30vh",
            maxHeight: "55vh",
            overflowY: "auto",
            bgcolor: "white",
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          },
        }}
      >
        <Box>
          <IconButton
            sx={{ color: theme.palette.primary.main }}
            onClick={() => setReviewModalOpen(false)}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        <ReviewForm open={reviewModalOpen} />

        <Carousel />
      </Drawer>

      <Box
        className="mainLayout__content"
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: { xs: "56px", sm: "64px" },
          mb: "80px",
        }}
      >
        <Outlet />
      </Box>

      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          textAlign: "center",
          bgcolor: "white",
          zIndex: 1200,
        }}
      ></Box>
    </Box>
  );
};

export default MainLayout;
