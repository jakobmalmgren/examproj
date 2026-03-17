// import { Outlet, Link as RouterLink } from "react-router-dom";
// import AppBar from "@mui/material/AppBar";
// import Toolbar from "@mui/material/Toolbar";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import Box from "@mui/material/Box";
// import "./MainLayout.css";

// const MainLayout = () => {
//   return (
//     <div className="mainLayout">
//       {/* Navbar */}
//       <AppBar position="static">
//         <Toolbar>
//           <Typography variant="h6" sx={{ flexGrow: 1 }}>
//             JobPortal
//           </Typography>

//           {/* Navbar links */}
//           <Box>
//             <Button color="inherit" component={RouterLink} to="/home">
//               My Applications
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/add">
//               Add Opportunity
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/stats">
//               Statistics
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/map">
//               Map
//             </Button>
//             <Button color="inherit" component={RouterLink} to="/profile">
//               Profile
//             </Button>
//           </Box>
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
import { Outlet, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

import HomeIcon from "@mui/icons-material/Home";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import BarChartIcon from "@mui/icons-material/BarChart";
import MapIcon from "@mui/icons-material/Map";
import PersonIcon from "@mui/icons-material/Person";

import "./MainLayout.css";

const MainLayout = () => {
  return (
    <div className="mainLayout">
      {/* Navbar */}
      <AppBar position="static">
        <Toolbar sx={{ justifyContent: "center", gap: 2 }}>
          <Tooltip title="My Applications" arrow>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/home"
              size="large"
            >
              <HomeIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Add Opportunity" arrow>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/add"
              size="large"
            >
              <AddCircleOutlineIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Statistics" arrow>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/stats"
              size="large"
            >
              <BarChartIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Map Overview" arrow>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/map"
              size="large"
            >
              <MapIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Profile" arrow>
            <IconButton
              color="inherit"
              component={RouterLink}
              to="/profile"
              size="large"
            >
              <PersonIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>

      {/* Page content */}
      <div className="mainLayout__content">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
