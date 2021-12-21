import React, { useState, useEffect } from "react";
import axios from "axios";
import Container from "react-bootstrap/Container";

import Header from "./Header.jsx";
import FormPost from "./FormPost/FormPost";
import Card from "./Post/Card/Card.jsx";

const Home = () => {
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/posts")
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [setDataPost]);

  // + .map for Card-->
  return (
    <Container className="w-custom-limit-800 ">
      <Header userId={"userId"} />
      <main>
        <FormPost />
        <Card
          title={"Lorem ipsum dolor sit amet."}
          text={"Lorem ipsum dolor sit amet consectetur adipisicing elit."}
          imageUrl={"imageUrl"}
          userName={"userName"}
          avatar={"avatar"}
          createdAt={"createdAt"}
          likes={"likes"}
        />
      </main>
    </Container>
  );
};

export default Home;
