import React, {useContext} from "react";
import { Navigate } from "react-router-dom";
import Container from "react-bootstrap/Container";

import Logo from "../Components/Logo.jsx";
import FormLogin from "../Components/Login/FormLogin/FormLogin";

import UserContextTest from "../Context/UserContextTest";

export default function Login() {
  const userContext = useContext(UserContextTest);
  return (
    <>
    {userContext.isLoggedIn && <Navigate to="/" replace={true}></Navigate>}
      <Container className="w-custom-limit-400">
      <header>
        <Logo />
      </header>
      <main>
        <span className="d-block h4 text-center mb-4">Vous avez déjà un compte ?</span>
        <FormLogin  />
      </main>
    </Container>
    
    </>
  
  );
}
