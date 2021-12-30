import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Header from "../Components/Home/Header.jsx";
import FormPost from "../Components/Home/FormPost/FormPost";
import Card from "../Components/Home/Post/Card/Card.jsx";
import userService from "../services/userService.js";
import { UserContext } from "../Context/UserContext";

const Home = () => {
  const { authHeader } = useContext(UserContext);
  const config = { headers: authHeader() };

  const [dataPost, setDataPost] = useState([]);
  const [addDataPost, setAddDataPost] = useState(true);

  const validateHandler = () => {
    setAddDataPost(true);
  };
  // console.log(addDataPost);
  useEffect(() => {
    if (addDataPost) {
      userService
        .getAllPosts(config)
        .then((response) => {
          // console.log(response);

          setDataPost(response.data);
          setAddDataPost(false);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [addDataPost]);

  // + .map for Card-->
  return (
    <Container className="w-custom-limit-800 ">
      <Header userId={"userId"} />
      <main>
        <FormPost onValidate={validateHandler} />
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
