import React, { useState, useEffect } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";

import Header from "./Header.jsx";
import FormPost from "./FormPost/FormPost";
import Card from "./Post/Card/Card.jsx";

const Home = () => {
  
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("user");

    let config = { headers: { Authorization: `Bearer ${JSON.parse(token)}` } };
    // console.log(config);
    // console.log(token);

    axios
      .get("http://localhost:3000/api/posts", config)
      .then((response) => {
        // console.log(response);
        let dataArr = response.data;
        console.log(dataArr);
        setDataPost(dataArr);
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
        {dataPost.map((post) => {
          return (
            <Card
              title={post.p_title}
              text={post.p_text}
              imageUrl={post.p_image}
              user={post.p_fk_user_id}
              avatar={"avatar"}
              createdAt={post.p_time}
              likes={"likes"}
              key={post.p_id}
            />
          );
        })}
      </main>
    </Container>
  );
};

export default Home;
