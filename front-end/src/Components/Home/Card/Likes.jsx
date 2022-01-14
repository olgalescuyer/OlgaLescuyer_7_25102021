import React from "react";
import Container from "react-bootstrap/Container";
import { HiThumbUp } from "react-icons/hi";
import { HiThumbDown } from "react-icons/hi";
import { HiOutlineThumbUp } from "react-icons/hi";
import { HiOutlineThumbDown } from "react-icons/hi";

const Likes = ({likes, likeId, likeUserId}) => {

  
 
  return (
    <div className="d-flex ">
      <div className="position-relative">
        <span className="position-absolute invisible">
          <HiThumbUp size={24} />
        </span>
        <span className="">
          <HiOutlineThumbUp size={24} />
        </span>

        <span>{" "+ likes}</span>
      </div>

      <div className="position-relative">
        <span className="position-absolute invisible">
          <HiThumbDown size={24} />
        </span>
        <span className="">
          <HiOutlineThumbDown size={24} />
        </span>

        <span>{" "+ likes}</span>
      </div>
    </div>
  );
};

export default Likes;
