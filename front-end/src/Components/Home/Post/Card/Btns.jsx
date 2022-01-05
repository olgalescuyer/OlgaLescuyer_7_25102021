import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../../Context/UserContext";
import Button from "react-bootstrap/Button";
import userService from "../../../../services/userService";

const Btns = ({ userId, postId }) => {
  const { authHeader, id, role } = useContext(UserContext);
  const config = { headers: authHeader() };
//   console.log(config);
  const [post, setPost] = useState(postId);
  //   console.log(post);

  const handleClick = (e) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => console.log(response))
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
