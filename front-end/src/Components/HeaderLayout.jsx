import React, { useState, useEffect, useContext } from "react";
import { Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Button from "react-bootstrap/Button";
import Tooltip from "react-bootstrap/Tooltip";

import userService from "../services/userService.js";

import logo from "../Assets/Logo/icon-left-font-monochrome-blac.png";
import UserContextTest from "../Context/UserContextTest";

import { RiHome2Fill } from "react-icons/ri";
import { RiHome2Line } from "react-icons/ri";
import { RiLogoutBoxRFill } from "react-icons/ri";
import { RiLogoutBoxRLine } from "react-icons/ri";
import { RiUserSettingsFill } from "react-icons/ri";
import { RiUserSettingsLine } from "react-icons/ri";
import { RiAddBoxFill } from "react-icons/ri";
import { RiAddBoxLine } from "react-icons/ri";

const HeaderLayout = () => {
  const navigate = useNavigate();
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = userContext.userId();

  const logoutHandler = () => {
    userContext.logout();
    navigate("/login", { replace: true });
  };

  // state for creating a dependency on the state of PostProfile & passing on useEffect  :
  const [addData, setAddData] = useState(true);
  const validateHandler = () => {
    setAddData(true);
  };
  //-----------------------------------------------------

  const [dataUser, setDataUser] = useState("");
  //   console.log(dataUser);

  useEffect(() => {
    userService
      .getOneUser(id, config)
      .then((response) => {
        // console.log("response : ",response);
        setDataUser(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, [addData]);

  const [dataPost, setDataPost] = useState([]);
  // console.log(dataPost);

  // console.log(addDataPost);
  useEffect(() => {
    if (addData) {
      userService
        .getAllPosts(config)
        .then((response) => {
          // console.log("response : ", response);

          setDataPost(response.data);
          setAddData(false);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [addData]);

  // toggles ------------------------ :

  const [toggleAddBox, setToggleAddBox] = useState(false);
  const handleToggleAddBox = () => {
    setToggleAddBox(!toggleAddBox);
  };

  return (
    <Container className="w-custom-limit-800 p-0 layout">
      <header className="position-sticky top-0" style={{ zIndex: "2" }}>
        <Navbar bg="light" expand="lg">
          <Container fluid className="g-0 px-2">
            <Navbar.Brand href="/" className="w-custom-limit-200">
              <img src={logo} alt="" className="img-fluid " />
            </Navbar.Brand>

            <div className="d-flex">
              {window.location.pathname === "/" && (
                <Button
                  variant="light"
                  title="Créer une publication"
                  className="position-relative p-0"
                  onClick={() => {
                    handleToggleAddBox();
                  }}
                >
                  <span
                    className={
                      toggleAddBox
                        ? "position-absolute "
                        : "position-absolute invisible"
                    }
                  >
                    <RiAddBoxFill size={26}></RiAddBoxFill>
                  </span>

                  <span className={!toggleAddBox ? "" : "invisible"}>
                    <RiAddBoxLine size={26}></RiAddBoxLine>
                  </span>
                </Button>
              )}

              <Button
                variant="light"
                title="aller à la page d'accueil"
                className="position-relative p-0 ms-2"
                onClick={() => {
                  navigate("/");
                }}
              >
                <span
                  className={
                    window.location.pathname === "/"
                      ? "position-absolute"
                      : "position-absolute invisible"
                  }
                >
                  <RiHome2Fill size={25}></RiHome2Fill>
                </span>
                <span className={window.location.pathname === "/" ? "" : ""}>
                  <RiHome2Line size={25}></RiHome2Line>
                </span>
              </Button>

              <OverlayTrigger
                placement="bottom"
                overlay={
                  <Tooltip id="button-tooltip-2">
                    {dataUser.u_first_name} {dataUser.u_last_name}
                  </Tooltip>
                }
              >
                {({ ref, ...triggerHandler }) => (
                  <Button
                    variant="light"
                    {...triggerHandler}
                    className="d-inline-flex align-items-center p-0 ms-2"
                    title="aller à la page de profile"
                    onClick={() => {
                      navigate("/profile/:id");
                      validateHandler();
                    }}
                  >
                    <div
                      data-title="Aller à la page de profile"
                      className="position-relative"
                      style={{ cursor: "pointer" }}
                      // onClick={() => navigate("/profile/:id")}
                      ref={ref}
                    >
                      <span
                        className={
                          window.location.pathname === "/profile/:id"
                            ? "position-absolute "
                            : "position-absolute invisible"
                        }
                      >
                        <RiUserSettingsFill size={24}></RiUserSettingsFill>
                      </span>
                      <span
                        className={
                          window.location.pathname === "/profile/:id" ? "" : ""
                        }
                      >
                        <RiUserSettingsLine size={24}></RiUserSettingsLine>
                      </span>
                    </div>
                  </Button>
                )}
              </OverlayTrigger>

              <Button
                variant="light"
                title="Se déconnecter"
                className="position-relaive p-0 ms-2"
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
      <Outlet
        context={{
          dataUser,
          dataPost,
          toggleAddBox,
          handleToggleAddBox,
          validateHandler,
        }}
      />
    </Container>
  );
};

export default HeaderLayout;
