import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LogInSignUp from "../pages/LogInSignUp/LogInSignUp";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LogInSignUp />} />
        <Route path="/signup" element={<LogInSignUp />} />
        <Route path="*" element={<LogInSignUp />} /> {/* default till signup */}
      </Routes>
    </Router>
  );
}

export default App;
