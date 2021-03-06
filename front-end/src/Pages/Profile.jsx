import React from "react";
import { useOutletContext } from "react-router-dom";

import Container from "react-bootstrap/Container";

import FormProfile from "../Components/Profile/FormProfile/FormProfile";

// import Avatars from "../Components/Profile/Avatars";

const Profile = () => {
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
          <FormProfile dataUser={dataUser} onValidate={validateHandler} />
        </Container>
      </main>
    </>
  );
};

export default Profile;
