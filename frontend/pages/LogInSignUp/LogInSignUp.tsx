import "./LogInSignUp.css";
import { useMatch } from "react-router-dom";
import AuthSkelleton from "../../components/AuthSkelleton/AuthSkelleton";
const LogInSignUp = () => {
  const loginMatch = useMatch("/login/*");

  const mode = loginMatch ? "login" : "signup";
  return (
    <div className="loginSignup">
      <div className="loginSignup__container">
        <div className="loginSignup__form">
          <AuthSkelleton mode={mode} />
        </div>
        <div className="loginSignup__hero"></div>
      </div>
    </div>
  );
};

export default LogInSignUp;
