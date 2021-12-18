import React from "react";
import Container from "react-bootstrap/Container";

import Logo from "../Logo.jsx";
import FormLogin from "./FormLogin/FormLogin";

export default function Login() {
  return (
    <Container className="w-custom-limit-400">
      <Logo />
      <div className="h4 text-center mb-4">Vous avez déjà un compte ?</div>
      <FormLogin />
    </Container>
  );
}
