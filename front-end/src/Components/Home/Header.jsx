import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import logo from "../../Assets/Logo/icon-left-font-monochrome-blac.png";

import authService from "../../services/authService";

const Header = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  const url = "/profile/" + userId; 
  
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="/home" className="w-custom-limit-200">
            <img src={logo} alt="" className="img-fluid " />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href={url} className="fw-bold text-end">
                Profile
              </Nav.Link>
              <Nav.Link href="/login" className="fw-bold text-end" onClick={() => authService.logout()}>
                Déconnexion
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
