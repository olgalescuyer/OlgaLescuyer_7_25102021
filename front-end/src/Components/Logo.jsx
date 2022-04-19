import React from "react";
import logo from "../Assets/Logo/icon-left-font-monochrome-blac.png";

import Image from "react-bootstrap/Image";

const Logo = () => {
  return (
    <div className="my-4" style={{ width: "80%" }}>
      <Image src={logo} alt="logo" className="" fluid />
    </div>
  );
};

export default Logo;
