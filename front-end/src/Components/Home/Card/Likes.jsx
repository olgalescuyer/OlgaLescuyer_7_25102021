import React, { useState, useContext, useEffect } from "react";
import userService from "../../../services/userService";
import UserContextTest from "../../../Context/UserContextTest";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ liked, disliked }) => {
  const userContext = useContext(UserContextTest);
  const token = userContext.token;
  // console.log(token);

  // counter :
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);

  // add a like/dislike from db :
  const [like, setLike] = useState(0);
  const [dislike, setDislike] = useState(0);

  // like/dislike from db :
  useEffect(() => {
    setLike(0);
    setDislike(0);
  }, []);

  // console.log(like);
  const handleLike = () => {
    if (countLike === 0 && countDislike === 0) {
      setCountLike(1);
      setLike(like + 1);

      // console.log(like);
      // submitToApi(postId, { like: like }, token);
    } else if (countLike === 1 && countDislike === 0) {
      setCountLike(0);
      setLike(like - 1);
    } else if (countLike === 0 && countDislike === 1) {
      setCountDislike(0);
      setCountLike(1);

      setDislike(dislike - 1);
      setLike(like + 1);
    }
  };

  const handleDislike = () => {
    if (countDislike === 0 && countLike === 0) {
      setCountDislike(1);
      setDislike(dislike + 1);
    } else if (countDislike === 1 && countLike === 0) {
      setCountDislike(0);
      setDislike(dislike - 1);
    } else if (countDislike === 0 && countLike === 1) {
      setCountLike(0);
      setCountDislike(1);

      setLike(like - 1);
      setDislike(dislike + 1);
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
            countLike === 1
              ? "position-absolute"
              : "position-absolute invisible"
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
            countDislike === 1
              ? "position-absolute"
              : "position-absolute invisible"
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
