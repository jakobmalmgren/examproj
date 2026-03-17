import "./App.css";
import { Routes, Route, BrowserRouter, Navigate } from "react-router-dom";
import LogInSignUp from "../pages/LogInSignUp/LogInSignUp";
import LogIn from "../components/LogIn/LogIn";
import SignUp from "../components/SignUp/SignUp";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirect root / till /auth (visar login) */}
        <Route path="/" element={<Navigate to="/auth" replace />} />

        {/* Parent layout */}
        <Route path="/auth" element={<LogInSignUp />}>
          {/* Child routes */}
          <Route index element={<LogIn />} /> {/* /auth */}
          <Route path="login" element={<LogIn />} /> {/* /auth/login */}
          <Route path="signup" element={<SignUp />} /> {/* /auth/signup */}
        </Route>

        {/* Wildcard fallback */}
        <Route path="*" element={<Navigate to="/auth" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
