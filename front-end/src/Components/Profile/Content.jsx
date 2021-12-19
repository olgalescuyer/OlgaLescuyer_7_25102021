import React from "react";
import Container from "react-bootstrap/Container";

import FormProfile from "./FormProfile/FormProfile";
import Avatars from "./Avatars";

const Content = () => {
  return (
    <main>
      <Container>
        <h1 className="text-center fs-3">Bonjour (user) !</h1>
        <p className="text-center">Choisis ton avatar</p>
        <Avatars />
        <FormProfile />
      </Container>
    </main>
  );
};

export default Content;
