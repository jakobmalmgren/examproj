// import { Outlet, Link as RouterLink } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Box from "@mui/material/Box";
// import IconButton from "@mui/material/IconButton";
// import Tooltip from "@mui/material/Tooltip";

// import HomeIcon from "@mui/icons-material/Home";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import BarChartIcon from "@mui/icons-material/BarChart";
// import MapIcon from "@mui/icons-material/Map";
// import PersonIcon from "@mui/icons-material/Person";

// import "./MainLayout.css";

// const MainLayout = () => {
//   return (
//     <div className="mainLayout">
//       {/* Navbar */}
//       <AppBar position="static">
//         <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
//           <Tooltip title="My Applications" arrow>
//             <IconButton
//               color="inherit"
//               component={RouterLink}
//               to="/home"
//               size="large"
//             >
//               <HomeIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Add Opportunity" arrow>
//             <IconButton
//               color="inherit"
//               component={RouterLink}
//               to="/add"
//               size="large"
//             >
//               <AddCircleOutlineIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Statistics" arrow>
//             <IconButton
//               color="inherit"
//               component={RouterLink}
//               to="/stats"
//               size="large"
//             >
//               <BarChartIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Map Overview" arrow>
//             <IconButton
//               color="inherit"
//               component={RouterLink}
//               to="/map"
//               size="large"
//             >
//               <MapIcon />
//             </IconButton>
//           </Tooltip>

//           <Tooltip title="Profile" arrow>
//             <IconButton
//               color="inherit"
//               component={RouterLink}
//               to="/profile"
//               size="large"
//             >
//               <PersonIcon />
//             </IconButton>
//           </Tooltip>
//         </Toolbar>
//       </AppBar>

//       {/* Page content */}
//       <div className="mainLayout__content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default MainLayout;
import { useState } from "react";
import { Outlet, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Box from "@mui/material/Box";
import Tooltip from "@mui/material/Tooltip";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import "./MainLayout.css";

const navItems = [
  { text: "My Applications", icon: <HomeIcon />, path: "/home" },
  { text: "Add Opportunity", icon: <AddIcon />, path: "/add" },
  { text: "Statistics", icon: <BarChartIcon />, path: "/stats" },
  { text: "Map", icon: <MapIcon />, path: "/map" },
  { text: "Profile", icon: <AccountCircleIcon />, path: "/profile" },
];

const MainLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className="mainLayout">
      {/* AppBar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Left: Brand */}
          <Typography variant="h6" sx={{ flexGrow: 0 }}>
            RMA
          </Typography>

          {/* Center: Desktop icons */}
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

          {/* Right: Hamburger for mobile/tablet */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={() => setDrawerOpen(true)}
            sx={{ display: { xs: "flex", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer (slides in from right) */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        PaperProps={{
          sx: {
            width: 250,
            transition: "transform 0.3s ease-in-out",
          },
        }}
      >
        {/* Close button */}
        <Box sx={{ display: "flex", justifyContent: "flex-start", p: 1 }}>
          <IconButton onClick={() => setDrawerOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Drawer nav items */}
        <List>
          {navItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                component={RouterLink}
                to={item.path}
                onClick={() => setDrawerOpen(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      {/* Page content */}
      <div className="mainLayout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
