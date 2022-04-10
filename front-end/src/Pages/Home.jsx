import React from "react";
import { useOutletContext } from "react-router-dom";

import Card from "../Components/Home/Card/Card.jsx";
import FormPost from "../Components/Home/FormPost/FormPost";

const Home = () => {
  const {
    dataUser,
    dataPost,
    toggleAddBox,
    handleToggleAddBox,
    validateHandler,
    addData,
  } = useOutletContext();
  // console.log(dataUser);
  console.log(dataPost);
  // + .map for Card-->
  return (
    <>
      <main>
        {toggleAddBox && (
          <FormPost
            onValidate={validateHandler}
            firstName={dataUser.u_first_name}
            lastName={dataUser.u_last_name}
            avatar={dataUser.u_avatar}
            onToggle={handleToggleAddBox}
          />
        )}

        {!toggleAddBox && (
          <>
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
                  avatar={post.u_avatar}
                  createdAt={post.p_time}
                  disliked={post.disliked}
                  liked={post.liked}
                  likeId={post.like_id}
                  likeUserId={post.l_fk_user_id}
                  userChoice={post.post_user_choice}
                  key={index}
                  onValidate={validateHandler}
                  addData={addData}
                />
              );
            })}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
