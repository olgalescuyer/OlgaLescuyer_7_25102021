import React, { useState, useContext, useEffect } from "react";
import userService from "../../../services/userService";
import UserContextTest from "../../../Context/UserContextTest";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ liked, disliked, postId, userChoice, likeId, onValidate }) => {
  const userContext = useContext(UserContextTest);
  const token = userContext.token;
  const userIdFromToken = parseInt(userContext.userId(), 10);

  // solution for null statement of data :
  const [value, setValue] = useState(null);
  const handleValue = (bool) => {
    setValue(bool);
  };
  // console.log(value);

  // add one like/dislike on click :
  const [addLike, setAddLike] = useState(0);
  const [addDislike, setAddDislike] = useState(0);
  // console.log(addDislike);

  // add a like/dislike + from db = COUNTER :
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);

  // object for id's :
  const dataId = {
    likeId: likeId === null ? value : likeId,
    postId: postId,
    userId: userIdFromToken,
  };

  // like/dislike from db :
  useEffect(() => {
    setCountLike(liked);
    setCountDislike(disliked);
  }, []);

  const doLike = () => {
    if (addLike === 0 && addDislike === 0) {
      setAddLike(1);
      setCountLike(countLike + 1);
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

  const doDislike = () => {
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

  const handleLike = () => {
    if (userChoice === null || userChoice === 0) {
      submitToApi(token, dataId, 1);

      doLike();
    } else if (userChoice === 1) {
      doLike();

      submitToApi(token, dataId, 0);
    } else if (userChoice === -1) {
      submitToApi(token, dataId, 0);

      doLike();
    } else {
      console.log("error");
    }
  };

  const handleDislike = () => {
    if (userChoice === null || userChoice === 0) {
      submitToApi(token, dataId, -1);

      doDislike();
    } else if (userChoice === -1) {
      doDislike();

      submitToApi(token, dataId, 0);
    } else if (userChoice === 1) {
      submitToApi(token, dataId, -1);
      doDislike();
    } else {
      console.log("error");
    }
  };

  const submitToApi = (token, data, like) => {
    data.likeId === null && value === null
      ? userService
          .addLikes(token, data, like)
          .then((response) => {
            // console.log(response);
            // console.log(response.data.response.insertId);
            // here I grab the value of like id from db & pass to object :
            handleValue(response.data.response.insertId);
          })
          .catch((err) => {
            console.log(err);
          })
      : userService
          .updateLike(token, data, like)
          .then((response) => {
            console.log(response);
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

        <span>{countLike}</span>
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
