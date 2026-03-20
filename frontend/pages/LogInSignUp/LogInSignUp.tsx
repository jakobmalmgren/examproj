import "./LogInSignUp.css";
import Carousel from "../../components/Carousel/Carousel";
import { Outlet } from "react-router-dom";
const LogInSignUp = () => {
  return (
    <div className="loginSignup">
      <div className="loginSignup__container">
        <div className="loginSignup__form">
          <Outlet />
        </div>
        <div className="loginSignup__hero">
          <img
            className="loginSignup__img"
            src="../../public/images/rma.png"
            alt=""
          />
          <Carousel></Carousel>
        </div>
      </div>
    </div>
  );
};

export default LogInSignUp;
