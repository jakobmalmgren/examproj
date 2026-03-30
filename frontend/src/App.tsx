// // import "./App.css";
// import { useState } from "react";
// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// // Layouts
// import LogInSignUp from "../pages/LogInSignUp/LogInSignUp";
// import MainLayout from "../components/Layouts/MainLayout/MainLayout";

// // Auth pages
// import LogIn from "../components/LogIn/LogIn";
// import SignUp from "../components/SignUp/SignUp";

// // Private pages
// import MyApplications from "../pages/MyApplications/MyApplications";
// import AddApplications from "../pages/AddApplications/AddApplications.";
// import StatisticReports from "../pages/StatisticReports/StatisticReports";
// import MapView from "../pages/MapView/MapView";

// function App() {
//   // State för inloggad status
//   // const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const [isLoggedIn, setIsLoggedIn] = useState(() => {
//     return !!localStorage.getItem("token");
//   });

//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* === Public routes (login/signup) === */}
//         {!isLoggedIn && (
//           <Route path="/auth" element={<LogInSignUp />}>
//             <Route index element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
//             <Route
//               path="login"
//               element={<LogIn setIsLoggedIn={setIsLoggedIn} />}
//             />
//             <Route path="signup" element={<SignUp />} />
//           </Route>
//         )}

//         {/* === Private routes (inloggad användare) === */}
//         {isLoggedIn && (
//           <Route
//             path="/"
//             element={<MainLayout setIsLoggedIn={setIsLoggedIn} />}
//           >
//             <Route path="home" element={<MyApplications />} />
//             <Route path="add" element={<AddApplications />} />
//             <Route path="stats" element={<StatisticReports />} />
//             <Route path="map" element={<MapView />} />
//           </Route>
//         )}

//         {/* Wildcard fallback */}
//         <Route
//           path="*"
//           element={
//             isLoggedIn ? (
//               <Navigate to="/home" replace />
//             ) : (
//               <Navigate to="/auth" replace />
//             )
//           }
//         />
//       </Routes>
//     </BrowserRouter>
//   );
// }

// export default App;

import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Layouts
import LogInSignUp from "../pages/LogInSignUp/LogInSignUp";
import MainLayout from "../components/Layouts/MainLayout/MainLayout";

// Auth pages
import LogIn from "../components/LogIn/LogIn";
import SignUp from "../components/SignUp/SignUp";

// Private pages
import MyApplications from "../pages/MyApplications/MyApplications";
import AddApplications from "../pages/AddApplications/AddApplications.";
import StatisticReports from "../pages/StatisticReports/StatisticReports";
import MapView from "../pages/MapView/MapView";

function PrivateRoute({ isLoggedIn, children }) {
  return isLoggedIn ? children : <Navigate to="/auth/login" replace />;
}

function PublicRoute({ isLoggedIn, children }) {
  return !isLoggedIn ? children : <Navigate to="/home" replace />;
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem("token");
  });

  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route
          path="/auth"
          element={
            <PublicRoute isLoggedIn={isLoggedIn}>
              <LogInSignUp />
            </PublicRoute>
          }
        >
          <Route index element={<LogIn setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="login"
            element={<LogIn setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* Private routes */}
        <Route
          path="/"
          element={
            <PrivateRoute isLoggedIn={isLoggedIn}>
              <MainLayout setIsLoggedIn={setIsLoggedIn} />
            </PrivateRoute>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="home" element={<MyApplications />} />
          <Route path="add" element={<AddApplications />} />
          <Route path="stats" element={<StatisticReports />} />
          <Route path="map" element={<MapView />} />
        </Route>

        {/* Fallback */}
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Navigate to="/home" replace />
            ) : (
              <Navigate to="/auth/login" replace />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
