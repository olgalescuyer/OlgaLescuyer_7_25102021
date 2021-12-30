import React from "react";
import Container from "react-bootstrap/Container";
import FormProfile from "./FormProfile/FormProfile";

import Avatars from "./Avatars";

const Content = ({userId, firstName, lastName, email, password}) => {
 
  return (
    <main>
      <Container className="mt-4">
        <h1 className="text-center fs-3">Bonjour {firstName + ' ' + lastName} !</h1>
        <p className="text-center">Choisis ton avatar </p>
        <Avatars />
        <FormProfile userId={userId} firstName={firstName} lastName={lastName} email={email} password={password}/>
      </Container>
    </main>
  );
};

export default Content;
