import React, { useContext, useState } from "react";
import UserContextTest from "../../../../Context/UserContextTest";
import Button from "react-bootstrap/Button";
import userService from "../../../../services/userService";

const Btns = ({ userId, postId, onValidate }) => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = parseInt(userContext.userId, 10);
  const role = userContext.role;

  const handleClick = (e) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => onValidate())
      .catch((err) => console.log(err));
  };

  if (userId === id) {
    return (
      <div>
        <Button
          variant="outline-secondary"
          type="submit"
          onClick={(e) => handleClick(e, postId, config)}
        >
          Supprimer
        </Button>
        <Button variant="primary" className="ms-3">
          Modifier
        </Button>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div>
        <Button
          variant="outline-secondary"
          type="submit"
          onClick={(e) => handleClick(e, postId, config)}
        >
          Supprimer
        </Button>
      </div>
    );
  }

  return null;
};

export default Btns;
