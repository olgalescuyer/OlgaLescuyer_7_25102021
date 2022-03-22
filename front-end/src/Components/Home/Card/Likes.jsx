import React, { useState, useContext, useEffect } from "react";
import userService from "../../../services/userService";
import UserContextTest from "../../../Context/UserContextTest";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ liked, disliked, postId, userChoice, userId, likeId }) => {
  const userContext = useContext(UserContextTest);
  const token = userContext.token;
  const userIdFromToken = parseInt(userContext.userId(), 10);

  const [validLike, setValidLike] = useState(false);
  const validateHandler = () => {
    setValidLike(true);
  };

  // add one like/dislike on click :
  const [addLike, setAddLike] = useState(0);
  const [addDislike, setAddDislike] = useState(0);
  // console.log(addDislike);

  // add a like/dislike + from db = COUNTER :
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);

  // like/dislike from db :
  useEffect(() => {
    setCountLike(liked);
    setCountDislike(disliked);
  }, [validLike]);

  const handleLike = () => {
    // likeId === null && userChoice === null
    //   ? console.log("null")
    //   : likeId !== null && userChoice === 0
    //   ? console.log("0")
    //   : likeId !== null && userChoice === 1
    //   ? console.log("1")
    //   : likeId !== null && userChoice === -1
    //   ? console.log("-1")
    //   : console.log("error");

    if (likeId === null && userChoice === null) {
      submitToApi(token, postId, 1);
      validateHandler();
    } else if (likeId !== null && userChoice === 0) {
      setAddLike(1);
      setCountLike(countLike + 1);
    } else if (likeId !== null && userChoice === 1) {
      setAddLike(0);
      setCountLike(countLike - 1);
    } else if (likeId !== null && userChoice === -1) {
    } else {
      console.log("error");
    }

    // if (addLike === 0 && addDislike === 0) {
    //   setAddLike(1);
    //   setCountLike(countLike + 1);

    // } else if (addLike === 1 && addDislike === 0 ) {
    //   setAddLike(0);
    //   setCountLike(countLike - 1);
    // } else if (addLike === 0 && addDislike === 1) {
    //   setAddDislike(0);
    //   setAddLike(1);

    //   setCountDislike(countDislike - 1);
    //   setCountLike(countLike + 1);
    // }
  };

  const handleDislike = () => {
    if (addDislike === 0 && addLike === 0) {
      setAddDislike(1);
      setCountDislike(countDislike + 1);

      // submitToApi(token, postId, -1);
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

  const submitToApi = (token, postId, like, likeId, userId) => {
    likeId === null
      ? userService
          .addLikes(token, postId, like)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          })
      : userService
          .updateLike(token, likeId, userId, postId, like)
          .then((response) => {
            console.log(response);
          })
          .catch((err) => {
            console.log(err);
          });
  };

  // countLike > 0
  //   ? submitToApi(token, postId, 1)
  //   : countDislike > 0
  //   ? submitToApi(token, postId, -1)
  //   : console.log("");

  // countDislike > 0 ? submitToApi(token, postId, -1) : console.log("");

  return (
    <div className="d-flex ">
      <div className="position-relative" onClick={handleLike}>
        <span
          className={
            userChoice === 1 || addLike === 1
              ? "position-absolute"
              : "position-absolute invisible"
          }
        >
          <HiThumbUp size={24} />
        </span>

        <span className="">
          <HiOutlineThumbUp size={24} />
        </span>

        <span>{liked}</span>
      </div>

      <div className="position-relative" onClick={handleDislike}>
        <span
          className={
            userChoice === -1 || addDislike === 1
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
