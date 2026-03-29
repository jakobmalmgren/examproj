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
import ListItemButton from "@mui/material/ListItemButton";
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

  // måste ha samma state som finns
  const handleLogout = () => {
    localStorage.removeItem("token"); // ❌ ta bort token
    setIsLoggedIn(false); // ❌ sätt state
  };

  return (
    <div className="mainLayout">
      <AppBar position="static">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/home"
            sx={{
              color: "inherit",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            <img
              src="/images/iconimg.png"
              alt="RMA Logo"
              style={{ height: "40px", width: "40px", borderRadius: "50%" }} // justera storlek
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
                      bgcolor: "primary.main",
                      color: "white",
                      fontSize: 14,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      "& .MuiTooltip-arrow": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              >
                <IconButton
                  component={RouterLink}
                  to={item.path}
                  color="inherit"
                  size="large"
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
        <ReviewDrawer></ReviewDrawer>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => {
          setDrawerOpen(false);
        }}
        transitionDuration={{ enter: 300, exit: 300 }}
        PaperProps={{
          sx: {
            width: 80,
            bgcolor: "white",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "flex-start", p: 0 }}>
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
            flexDirection: "column",
            alignItems: "center",
            mt: 2,
          }}
        >
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding sx={{ width: "100%" }}>
              <Tooltip
                title={item.text}
                arrow
                placement="right"
                componentsProps={{
                  tooltip: {
                    sx: {
                      bgcolor: "primary.main",
                      color: "white",
                      fontSize: 14,
                      borderRadius: 1,
                      px: 1.5,
                      py: 0.5,
                      "& .MuiTooltip-arrow": {
                        color: "primary.main",
                      },
                    },
                  },
                }}
              >
                <ListItemButton
                  component={RouterLink}
                  to={item.path}
                  onClick={() => setDrawerOpen(false)}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    color: theme.palette.primary.main,
                    bgcolor: "transparent",
                    "&:hover": {
                      bgcolor: theme.palette.primary.main,
                      color: "white",
                    },
                    borderRadius: 1,
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      justifyContent: "center",
                      color: "inherit",
                    }}
                  >
                    {item.icon}
                  </ListItemIcon>
                </ListItemButton>
              </Tooltip>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className="mainLayout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
