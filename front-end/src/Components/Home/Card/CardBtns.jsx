import React, { useContext, useState } from "react";
import UserContextTest from "../../../Context/UserContextTest";
import userService from "../../../services/userService";
import { GoKebabVertical } from "react-icons/go";
import CardModal from "./CardModal";

const Btns = ({ userId, postId, onValidate }) => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = parseInt(userContext.userId(), 10);
  const role = userContext.role();

  const [item, setItem] = useState(false);

  const handleStateItem = () => {
    setItem(!item);
  };

  const handleDelete = (e) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => onValidate())
      .catch((err) => console.log(err));
  };

  // const handleUpdate = (e, postId, postData) => {
  //   userService
  //     .updatePost(postId, postData)
  //     .then((response) => console.log(response))
  //     .catch((err) => console.log(err));
  // };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  if (userId === id) {
    return (
      <div className="d-flex">
        {item && (
          <>
            <div className=" d-flex">
              <span
                className="text-danger"
                style={{ cursor: "pointer" }}
                onClick={(e) => handleDelete(e, postId, config)}
              >
                Supprimer
              </span>
              <span
                className="text-end ps-2 "
                style={{ cursor: "pointer" }}
                onClick={handleShow}
              >
                Modifier
              </span>
            </div>

            <CardModal onClose={handleClose} show={show} postId={postId} />
          </>
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
            <span
              className="text-danger"
              style={{ cursor: "pointer" }}
              onClick={(e) => handleDelete(e, postId, config)}
            >
              {" "}
              Supprimer
            </span>
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
