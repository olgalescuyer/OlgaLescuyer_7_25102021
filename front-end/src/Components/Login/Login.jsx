import React from "react";
import Container from "react-bootstrap/Container";

import Logo from "../Logo.jsx";
import FormLogin from "./FormLogin/FormLogin";

export default function Login() {
  return (
    <Container className="w-custom-limit-400">
      <header>
        <Logo />
      </header>
      <main>
        <span className="d-block h4 text-center mb-4">Vous avez déjà un compte ?</span>
        <FormLogin />
      </main>
    </Container>
  );
}
