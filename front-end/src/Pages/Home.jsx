import React, { useState, useEffect, useContext } from "react";
import Container from "react-bootstrap/Container";
import Card from "../Components/Home/Card/Card.jsx";
import Header from "../Components/Home/Header.jsx";
import FormPost from "../Components/Home/FormPost/FormPost";
import userService from "../services/userService.js";

import UserContextTest from "../Context/UserContextTest";

const Home = () => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = userContext.userId();

  const [dataUser, setDataUser] = useState("");

  useEffect(() => {
    userService
      .getOneUser(id, config)
      .then((response) => {
        // console.log(response);
        setDataUser(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          console.log(response);

          setDataPost(response.data);
          setAddDataPost(false);
        })

        .catch((error) => {
          console.log(error);
        });
    }
  }, [addDataPost]);

  const [toggle, setToggle] = useState(false);
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // + .map for Card-->
  return (
    <Container className="w-custom-limit-800 p-0">
      <Header userId={"userId"} toggle={handleToggle} />
      {toggle && (
        <FormPost
          onValidate={validateHandler}
          firstName={dataUser.u_first_name}
          lastName={dataUser.u_last_name}
          toggle={handleToggle}
        />
      )}

     { !toggle && <main>
        {dataPost.map((post, index) => {
          return (
            <Card
              postId={post.p_id}
              title={post.p_title}
              text={post.p_text}
              imageUrl={post.p_image}
              userId={post.p_fk_user_id}
              firstName={post.u_first_name}
              lastName={post.u_last_name}
              avatar={"avatar"}
              createdAt={post.p_time}
              likes={post.l_choice}
              likeId={post.l_id}
              likeUserId={post.l_fk_user_id}
              key={index}
              onValidate={validateHandler}
            />
          );
        })}
      </main>}
    </Container>
  );
};

export default Home;
