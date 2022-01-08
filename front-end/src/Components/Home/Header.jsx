import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
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
        <Container fluid className="g-0">
          <Navbar.Brand href="/home" className="w-custom-limit-200">
            <img src={logo} alt="" className="img-fluid " />
          </Navbar.Brand>

          <div className="d-flex">
            <div className="position-relative" style={{ cursor: "pointer" }}>
              <span className="position-absolute">
                <RiHome2Fill size={24}></RiHome2Fill>
              </span>
              <span className="invisible">
                <RiHome2Line size={24}></RiHome2Line>
              </span>
            </div>
            <div
              className="position-relative ps-2"
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/profile/:id")}
            >
              <span className="position-absolute invisible">
                <RiUserSettingsFill size={24}></RiUserSettingsFill>
              </span>
              <span className="">
                <RiUserSettingsLine size={24}></RiUserSettingsLine>
              </span>
            </div>
            <div
              className="position-relaive ps-2"
              style={{ cursor: "pointer" }}
              onClick={logoutHandler}
            >
              <span className="position-absolute invisible">
                <RiLogoutBoxRFill size={24}></RiLogoutBoxRFill>
              </span>
              <span>
                <RiLogoutBoxRLine size={24}></RiLogoutBoxRLine>
              </span>
            </div>
          </div>

          {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href={url} className="fw-bold text-end">
                Profile
              </Nav.Link>
              <Nav.Link
                href="/login"
                className="fw-bold text-end"
                onClick={logoutHandler}
              >
                Déconnexion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse> */}
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
