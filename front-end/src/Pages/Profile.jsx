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

  const [user, setUser] = useState({});

  useEffect(() => {
    userService
      .getOneUser(id, config)
      .then((response) => {
        // console.log(response.data);

        setUser(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Container className="w-custom-limit-800">
      <Header />
      <main>
        <Container className="mt-4">
          <h1 className="text-center fs-3">
            Bonjour {user.u_first_name + " " + user.u_last_name} !
          </h1>
          <p className="text-center">Choisis ton avatar </p>
          <Avatars />
          <FormProfile
            userId={user.u_id}
            firstName={user.u_first_name}
            lastName={user.u_last_name}
            email={user.u_email}
            password={user.u_password}
          />
        </Container>
      </main>
    </Container>
  );
};

export default Profile;
