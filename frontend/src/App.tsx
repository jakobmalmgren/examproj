import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import LogInSignUp from "../pages/LogInSignUp/LogInSignUp";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";
// Auth pages
import LogIn from "../components/LogIn/LogIn";
import SignUp from "../components/SignUp/SignUp";

// Private pages
import AboutUs from "../pages/AboutUs/AboutUs";
import MyApplications from "../pages/MyApplications/MyApplications";
import AddApplications from "../pages/AddApplications/AddApplications.";
import StatisticReports from "../pages/StatisticReports/StatisticReports";
import MapView from "../pages/MapView/MapView";
import EditProfile from "../pages/EditProfile/EditProfile";

function App() {
  const isLoggedIn = true; // Här kan du använda context/state senare

  return (
    <BrowserRouter>
      <Routes>
        {/* === Public routes (login/signup) === */}
        {!isLoggedIn && (
          <Route path="/auth" element={<LogInSignUp />}>
            <Route index element={<LogIn />} />
            <Route path="login" element={<LogIn />} />
            <Route path="signup" element={<SignUp />} />
          </Route>
        )}

        {/* Redirect root / */}
        <Route
          path="/"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />

        {/* === Private routes (inloggad användare) === */}
        {isLoggedIn && (
          <Route path="/" element={<MainLayout />}>
            <Route path="home" element={<MyApplications />} />
            <Route path="add" element={<AddApplications />} />
            <Route path="stats" element={<StatisticReports />} />
            <Route path="map" element={<MapView />} />
            <Route path="profile" element={<EditProfile />} />
            <Route path="about" element={<AboutUs />} />
          </Route>
        )}

        {/* Wildcard fallback */}
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
