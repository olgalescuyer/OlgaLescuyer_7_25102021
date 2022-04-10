import React, { useEffect, useState, useContext } from "react";
import { useOutletContext } from "react-router-dom";

import Container from "react-bootstrap/Container";

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

  const { dataUser, validateHandler } = useOutletContext();

  return (
    <>
      <main>
        <Container className="mt-2 pb-4">
          <h1 className="text-center fs-3">
            Bonjour {dataUser.u_first_name + " " + dataUser.u_last_name} !
          </h1>
          {/* <p className="text-center">Choisis ton avatar </p>
          <Avatars /> */}
          <FormProfile dataUser={dataUser} validateHandler={validateHandler}/>
        </Container>
      </main>
    </>
  );
};

export default Profile;
