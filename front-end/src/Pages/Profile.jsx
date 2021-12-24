import React from "react";
import Container from "react-bootstrap/Container";

import Header from "../Components/Profile/Header.jsx";
import Content from "../Components/Profile/Content.jsx";

const Profile = () => {
  return (
    <Container className="w-custom-limit-800">
      <Header />
      <Content />
    </Container>
  );
};

export default Profile;
