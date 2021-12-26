import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Header from "../Components/Home/Header.jsx";
import FormPost from "../Components/Home/FormPost/FormPost";
import Card from "../Components/Home/Post/Card/Card.jsx";
import userService from "../services/userService.js";

const Home = () => {
  const [dataPost, setDataPost] = useState([]);

  useEffect(() => {
    userService
      .getAllPosts()
      .then((response) => {
        // console.log(response);
        setDataPost(response.data);
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
              userId={post.p_fk_user_id}
              firstName={post.u_first_name}
              lastName={post.u_last_name}
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
