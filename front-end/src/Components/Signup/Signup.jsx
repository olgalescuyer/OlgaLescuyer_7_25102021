import React from "react";
import Container from "react-bootstrap/Container";

import Logo from "../Logo.jsx";
import FormSignup from "./FormSignup/FormSignup";

const Signup = () => {
  return (
    <Container className="w-custom-limit-400">
      <Logo />
      <FormSignup />
    </Container>
  );
};

export default Signup;
