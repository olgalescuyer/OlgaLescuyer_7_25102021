import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Logo from "../Components/Logo.jsx";
import FormSignup from "../Components/Signup/FormSignup/FormSignup";

import UserContext from "../Context/UserContext";

const Signup = () => {
  const userContext = useContext(UserContext);
  return (
    <>
      {userContext.isLoggedIn && <Navigate to="/" replace={true}></Navigate>}
      <Container className="w-custom-limit-400">
        <header>
          <Logo />
        </header>

        <main>
          <FormSignup />
        </main>
      </Container>
    </>
  );
};

export default Signup;
