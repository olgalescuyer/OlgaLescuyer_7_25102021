import React, { useState, useContext } from "react";
import userService from "../../../services/userService";
import UserContextTest from "../../../Context/UserContextTest";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ postId, likes }) => {
  const userContext = useContext(UserContextTest);
  const token = userContext.token;
  // console.log(token);

  const [like, setLike] = useState(0);
  // console.log(like);
  const handleLike = () => {
    if (like === 0 && dislike === 0) {
      setLike(1);
      // console.log(like);
      // submitToApi(postId, { like: like }, token);
    } else if (like === 1) {
      setLike(0);
    } else if (like === 0 && dislike === -1) {
      setLike(1);
      setDislike(0);
    }
  };

  const [dislike, setDislike] = useState(0);
  const handleDislike = () => {
    if (dislike === 0 && like === 0) {
      setDislike(-1);
    } else if (dislike === -1) {
      setDislike(0);
    } else if (dislike === 0 && like === 1) {
      setLike(0);
      setDislike(-1);
    }
  };

  const submitToApi = (postId, like, token) => {
    userService
      .addLikes(postId, like, token)
      .then((response) => {
        // console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="d-flex ">
      <div className="position-relative" onClick={handleLike}>
        <span
          className={
            like === 1 ? "position-absolute" : "position-absolute invisible"
          }
        >
          <HiThumbUp size={24} />
        </span>

        <span className="">
          <HiOutlineThumbUp size={24} />
        </span>

        <span>{like}</span>
      </div>

      <div className="position-relative" onClick={handleDislike}>
        <span
          className={
            dislike === -1 ? "position-absolute" : "position-absolute invisible"
          }
        >
          <HiThumbDown size={24} />
        </span>
        <span className="">
          <HiOutlineThumbDown size={24} />
        </span>

        <span>{dislike}</span>
      </div>
    </div>
  );
};

export default Likes;
