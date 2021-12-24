import React from "react";
import Container from "react-bootstrap/Container";

import Logo from "../Components/Logo.jsx";
import FormSignup from "../Components/Signup/FormSignup/FormSignup";

const Signup = () => {
  return (
    <Container className="w-custom-limit-400">
      <header>
        <Logo />
      </header>

      <main>
        <FormSignup />
      </main>
    </Container>
  );
};

export default Signup;
