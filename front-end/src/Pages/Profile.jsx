import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "../Components/Profile/Header.jsx";

import userService from "../services/userService.js";
// import { UserContext } from "../Context/UserContext";
import UserContextTest from "../Context/UserContextTest";
import FormProfile from "../Components/Profile/FormProfile/FormProfile";

import Avatars from "../Components/Profile/Avatars";

const Profile = () => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = userContext.userId();

  // state for creating a dependency on the state of PostProfile & passing on useEffect  :
  const [addDataUser, setAddDataUser] = useState(true);
  const validateHandler = (bool) => {
    setAddDataUser(bool);
  };

  const [user, setUser] = useState({});

  useEffect(() => {
    if (addDataUser) {
      userService
        .getOneUser(id, config)
        .then((response) => {
          // console.log(response.data);

          setUser(response.data);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [addDataUser]);

  return (
    <Container className="w-custom-limit-800 p-0">
      {/* <Header onValidate={validateHandler}/> */}
      <main>
        <Container className="mt-2 pb-4">
          <h1 className="text-center fs-3">
            Bonjour {user.u_first_name + " " + user.u_last_name} !
          </h1>
          {/* <p className="text-center">Choisis ton avatar </p>
          <Avatars /> */}
          <FormProfile dataUser={user} />
        </Container>
      </main>
    </Container>
  );
};

export default Profile;
