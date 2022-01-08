import React, { useContext, useState } from "react";
import UserContextTest from "../../../Context/UserContextTest";
import userService from "../../../services/userService";
import { GoKebabVertical } from "react-icons/go";

const Btns = ({ userId, postId, onValidate }) => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = parseInt(userContext.userId(), 10);
  const role = userContext.role();

  const handleClick = (e) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => onValidate())
      .catch((err) => console.log(err));
  };

  const [item, setItem] = useState(false);

  const handleStateItem = () => {
    setItem(!item);
  };

  if (userId === id) {
    return (
      <div className="d-flex">
        {item && (
          <div className=" d-flex">
            <div
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClick(e, postId, config)}
            >
              {" "}
              Supprimer
            </div>
            <div className="text-end ps-2" style={{ cursor: "pointer" }}>
              {" "}
              Modifier
            </div>
          </div>
        )}

        <div
          title="Options"
          style={{ cursor: "pointer" }}
          onClick={() => handleStateItem()}
        >
          <GoKebabVertical size={24}></GoKebabVertical>
        </div>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div className="d-flex">
        {item && (
          <div className="">
            <div
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleClick(e, postId, config)}
            >
              {" "}
              Supprimer
            </div>
          </div>
        )}

        <div
          title="Options"
          style={{ cursor: "pointer" }}
          onClick={() => handleStateItem()}
        >
          <GoKebabVertical size={24}></GoKebabVertical>
        </div>
      </div>
    );
  }

  return null;
};

export default Btns;
