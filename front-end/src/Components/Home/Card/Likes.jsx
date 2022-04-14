import React, { useState, useContext, useEffect } from "react";
import userService from "../../../services/userService";
import UserContext from "../../../Context/UserContext";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ addData, dataPost }) => {
  const userContext = useContext(UserContext);

  const token = userContext.token;
  const userIdFromToken = parseInt(userContext.userId(), 10);

  // state of the current user-choice-like from db, can be null or 0 or 1 or -1 :
  const [initial, setInitial] = useState(null);
  const handleInitial = (state) => {
    setInitial(state);
  };

  useEffect(() => {
    handleInitial(dataPost.post_user_choice);
  }, [addData]);

  // solution for change a null statement of like_id from db & passing for call to API :
  const [value, setValue] = useState(null);
  const handleValue = (bool) => {
    setValue(bool);
  };

  // add a like/dislike + from db = COUNTER :
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);

  // like/dislike from db :
  useEffect(() => {
    setCountLike(dataPost.liked);
    setCountDislike(dataPost.disliked);
  }, [addData]);

  // object for id's :
  const dataId = {
    likeId: dataPost.like_id === null ? value : dataPost.like_id,
    postId: dataPost.p_id,
    userId: userIdFromToken,
  };

  const handleLike = () => {
    if (initial === null || initial === 0) {
      submitToApi(token, dataId, 1);

      setCountLike(countLike + 1);

      setInitial(1);
    } else if (initial === 1) {
      submitToApi(token, dataId, 0);

      setCountLike(countLike - 1);

      setInitial(0);
    } else {
      submitToApi(token, dataId, 1);

      setCountDislike(countDislike - 1);
      setCountLike(countLike + 1);

      setInitial(1);
    }
  };

  const handleDislike = () => {
    if (initial === null || initial === 0) {
      submitToApi(token, dataId, -1);

      setCountDislike(countDislike + 1);

      setInitial(-1);
    } else if (initial === -1) {
      submitToApi(token, dataId, 0);

      setCountDislike(countDislike - 1);

      setInitial(0);
    } else {
      submitToApi(token, dataId, -1);

      setCountLike(countLike - 1);
      setCountDislike(countDislike + 1);

      setInitial(-1);
    }
  };

  const submitToApi = (token, data, like) => {
    data.likeId === null && value === null
      ? userService
          .addLike(token, data, like)
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
            initial === 1 ? "position-absolute" : "position-absolute invisible"
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
            initial === -1 ? "position-absolute" : "position-absolute invisible"
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
