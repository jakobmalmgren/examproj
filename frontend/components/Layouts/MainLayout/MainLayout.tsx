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
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";
import ReviewDrawer from "../../Review/ReviewDrawer";

const navItems = [
  { text: "My Applications", icon: <HomeIcon />, path: "/home" },
  { text: "Add Application", icon: <AddIcon />, path: "/add" },
  { text: "Statistics", icon: <BarChartIcon />, path: "/stats" },
  { text: "Map", icon: <RoomIcon />, path: "/map" },
];

const MainLayout = ({ setIsLoggedIn }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    // ✅ ÄNDRING 1:
    // Bytte från vanlig div till Box med height: 100vh
    // så hela layouten får fast höjd och kan delas upp i:
    // header / scrollbart content / footer
    <Box
      className="mainLayout"
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // ✅ ÄNDRING 2: hindrar hela sidan från att scrolla
      }}
    >
      {/* ✅ ÄNDRING 3:
          position="fixed" istället för "static"
          så navbaren alltid ligger kvar högst upp */}
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
              style={{ height: "50px", width: "50px", borderRadius: "50%" }}
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <IconButton sx={{ color: "inherit" }} onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>

            <IconButton
              color="inherit"
              edge="end"
              onClick={() => {
                setDrawerOpen(true);
              }}
              sx={{ display: { xs: "flex", md: "none" } }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
        <ReviewDrawer />
      </AppBar>

      <Drawer
        anchor="top"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
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
            sx={{
              color: theme.palette.primary.main,
            }}
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

      {/* ✅ ÄNDRING 4:
          Detta är nu den ENDA scrollbara delen.
          mt = höjd för AppBar så innehållet inte hamnar bakom navbaren
          mb = höjd för footer så innehållet inte hamnar bakom footern */}
      <Box
        className="mainLayout__content"
        sx={{
          flex: 1,
          overflowY: "auto",
          mt: { xs: "56px", sm: "64px" }, // plats för fixed AppBar
          mb: "80px", // plats för fixed footer
          // display: "flex", // ✅ NY
          // justifyContent: "center", // ✅ NY
          // alignItems: "center",
        }}
      >
        <Outlet />
      </Box>

      {/* ✅ ÄNDRING 5:
          Footern är nu fixed längst ner
          och har fast höjd */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "80px", // fast höjd
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          textAlign: "center",
          borderTop: "1px solid #e0e0e0",
          bgcolor: "white",
          zIndex: 1200, // så den ligger fint ovanpå content
        }}
      >
        <Typography variant="body2" sx={{ color: "primary.main" }}>
          © {new Date().getFullYear()} RMA — Remember My Applications Copyright
          | By Jakob Malmgren | All Rights Reserved
        </Typography>
      </Box>
    </Box>
  );
};

export default MainLayout;
