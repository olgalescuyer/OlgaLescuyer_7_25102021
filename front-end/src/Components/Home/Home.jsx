import React from "react";
import Container from "react-bootstrap/Container";

import Header from "./Header.jsx";
import FormPost from './FormPost/FormPost'

const Home = () => {
  return (
    <Container className="w-custom-limit-800 ">
      <Header />
      <FormPost />
    </Container>
  );
};

export default Home;
