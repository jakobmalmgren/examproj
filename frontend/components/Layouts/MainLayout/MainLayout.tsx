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
import PeopleIcon from "@mui/icons-material/People";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import RoomIcon from "@mui/icons-material/Room";
import LogoutIcon from "@mui/icons-material/Logout";
import Tooltip from "@mui/material/Tooltip";
import { useTheme } from "@mui/material/styles";

const navItems = [
  { text: "My Applications", icon: <HomeIcon />, path: "/home" },
  { text: "Add Application", icon: <AddIcon />, path: "/add" },
  { text: "Statistics", icon: <BarChartIcon />, path: "/stats" },
  { text: "Map", icon: <RoomIcon />, path: "/map" },
  { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
  { text: "AboutUs", icon: <PeopleIcon />, path: "/about" },
];

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();

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
            RMA
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
              <Tooltip key={item.text} title={item.text} arrow>
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

          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Tooltip title="Log Out" arrow>
              <IconButton
                sx={{
                  color: "inherit",
                }}
                onClick={() => console.log("Log out")}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>

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
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
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
              <Tooltip title={item.text} arrow placement="right">
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
