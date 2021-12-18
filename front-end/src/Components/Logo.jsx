import React from "react";
import logo from "../Assets/Logo/icon-left-font-monochrome-blac.png";

const Logo = () => {
  return (
    <div className="d-flex justify-content-center mt-4 mb-4 ">
      <img src={logo} alt="logo" className="img-fluid " />
    </div>
  );
};

export default Logo;
