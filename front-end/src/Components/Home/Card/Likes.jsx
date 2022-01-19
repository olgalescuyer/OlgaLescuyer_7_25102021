import React, { useState } from "react";

import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({ likes, likeId, likeUserId }) => {
  // console.log(likes, likeId, likeUserId);

  const [like, setLike] = useState(0);
  const handleLike = () => {
    if (like === 0 && dislike === 0) {
      setLike(1);
    } else if (like === 1) {
      setLike(0);
    }
  };

  const [dislike, setDislike] = useState(0);
  const handleDislike = () => {
    if (dislike === 0 && like === 0) {
      setDislike(-1);
    } else if (dislike === -1) {
      setDislike(0);
    }
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

        <span>{like + likes}</span>
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

        <span>{dislike + likes}</span>
      </div>
    </div>
  );
};

export default Likes;
