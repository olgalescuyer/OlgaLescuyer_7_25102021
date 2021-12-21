import React, {useState,useEffect} from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import FormProfile from "./FormProfile/FormProfile";
import Avatars from "./Avatars";

const Content = () => {

const [user, setUser] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/:id")
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setUser]);

  return (
    <main>
      <Container>
        <h1 className="text-center fs-3">Bonjour (user) !</h1>
        <p className="text-center">Choisis ton avatar</p>
        <Avatars />
        <FormProfile user={user}/>
      </Container>
    </main>
  );
};

export default Content;
