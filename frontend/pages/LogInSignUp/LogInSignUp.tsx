import "./LogInSignUp.css";
// import AuthSkelleton from "../../components/AuthSkelleton/AuthSkelleton";
import { Outlet } from "react-router-dom";
const LogInSignUp = () => {
  return (
    <div className="loginSignup">
      <div className="loginSignup__container">
        <div className="loginSignup__form">
          {/* <AuthSkelleton /> */}
          <Outlet />
        </div>
        <div className="loginSignup__hero"></div>
      </div>
    </div>
  );
};

export default LogInSignUp;
