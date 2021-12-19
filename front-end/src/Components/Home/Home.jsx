import React from "react";
import Container from "react-bootstrap/Container";

import Header from "./Header.jsx";
import FormPost from "./FormPost/FormPost";
import Card from "./Post/Card/Card.jsx";

const Home = () => {
  return (
    <Container className="w-custom-limit-800 ">
      <Header />
      <FormPost />
      <Card />
    </Container>
  );
};

export default Home;
