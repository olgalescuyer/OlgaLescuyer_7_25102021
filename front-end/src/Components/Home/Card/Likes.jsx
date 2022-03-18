import React, { useState, useContext, useEffect } from "react";
import userService from "../../../services/userService";
import UserContextTest from "../../../Context/UserContextTest";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ liked, disliked, postId }) => {
  const userContext = useContext(UserContextTest);
  const token = userContext.token;
  // console.log(token);

  // add one like/dislike on click :
  const [addLike, setAddLike] = useState(0);
  const [addDislike, setAddDislike] = useState(0);

  // add a like/dislike + from db = COUNTER :
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);

  // like/dislike from db :
  useEffect(() => {
    setCountLike(liked);
    setCountDislike(disliked);
  }, []);

  const handleLike = () => {
    if (addLike === 0 && addDislike === 0) {
      setAddLike(1);
      setCountLike(countLike + 1);

      // submitToApi(postId, { like: like }, token);
    } else if (addLike === 1 && addDislike === 0) {
      setAddLike(0);
      setCountLike(countLike - 1);
    } else if (addLike === 0 && addDislike === 1) {
      setAddDislike(0);
      setAddLike(1);

      setCountDislike(countDislike - 1);
      setCountLike(countLike + 1);
    }
  };

  const handleDislike = () => {
    if (addDislike === 0 && addLike === 0) {
      setAddDislike(1);
      setCountDislike(countDislike + 1);
    } else if (addDislike === 1 && addLike === 0) {
      setAddDislike(0);
      setCountDislike(countDislike - 1);
    } else if (addDislike === 0 && addLike === 1) {
      setAddLike(0);
      setAddDislike(1);

      setCountLike(countLike - 1);
      setCountDislike(countDislike + 1);
    }
  };



  const submitToApi = (token,postId, like ) => {
    userService
      .addLikes(token,postId, like)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  countLike > 0
  ? submitToApi(token, postId, addLike)
  : countDislike > 0
  ? console.log("countDislike", countDislike)
  : console.log("");

  return (
    <div className="d-flex ">
      <div className="position-relative" onClick={handleLike}>
        <span
          className={
            addLike === 1 ? "position-absolute" : "position-absolute invisible"
          }
        >
          <HiThumbUp size={24} />
        </span>

        <span className="">
          <HiOutlineThumbUp size={24} />
        </span>

        <span>{countLike}</span>
      </div>

      <div className="position-relative" onClick={handleDislike}>
        <span
          className={
            addDislike === 1
              ? "position-absolute"
              : "position-absolute invisible"
          }
        >
          <HiThumbDown size={24} />
        </span>
        <span className="">
          <HiOutlineThumbDown size={24} />
        </span>

        <span>{countDislike}</span>
      </div>
    </div>
  );
};

export default Likes;
