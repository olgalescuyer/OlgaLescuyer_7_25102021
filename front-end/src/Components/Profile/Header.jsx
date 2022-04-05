import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";

import logo from "../../Assets/Logo/icon-left-font-monochrome-blac.png";

import UserContextTest from "../../Context/UserContextTest";

import { RiHome2Fill } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";

const Header = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContextTest);
  // console.log(userContext.logout);

  const logoutHandler = () => {
    userContext.logout();
    navigate("/login", { replace: true });
  };
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid className="g-0 px-2">
          <Navbar.Brand href="/" className="w-custom-limit-200">
            <img src={logo} alt="" className="img-fluid " />
          </Navbar.Brand>

          <div className="d-flex">
            <Button
              variant="light"
              title=" Aller à la page d'accueil"
              className="position-relativ p-0"
              onClick={() => navigate("/")}
            >
              {/* <span className="">
                <RiHome2Fill size={25}></RiHome2Fill>
              </span> */}
              <span className="">
                <RiHome2Line size={25}></RiHome2Line>
              </span>
            </Button>

            <Button variant="light" className="position-relativ p-0 ms-2">
              <span className="">
                <RiUserSettingsFill size={24}></RiUserSettingsFill>
              </span>
              {/* <span className="">
                <RiUserSettingsLine size={25}></RiUserSettingsLine>
              </span> */}
            </Button>
            <Button
              variant="light"
              title="Se déconnecter"
              className="position-relative p-0 ms-2"
              onClick={logoutHandler}
            >
              <span className="position-absolute invisible">
                <RiLogoutBoxRFill size={24}></RiLogoutBoxRFill>
              </span>
              <span>
                <RiLogoutBoxRLine size={24}></RiLogoutBoxRLine>
              </span>
            </Button>
          </div>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
