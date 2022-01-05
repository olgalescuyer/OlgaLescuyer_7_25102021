import React, { useContext, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import Button from "react-bootstrap/Button";
import userService from "../../../../services/userService";

const Btns = ({ userId, postId, onValidate }) => {
  const { authHeader, id, role } = useContext(UserContext);
  const config = { headers: authHeader() };

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
