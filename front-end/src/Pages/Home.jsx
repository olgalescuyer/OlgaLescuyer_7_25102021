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

  // console.log(dataPost);
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
                  dataPost={post}
                  postpostId={post.p_id}
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
