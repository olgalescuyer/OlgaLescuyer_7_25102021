import React, { useContext, useState } from "react";
import UserContext from "../../../Context/UserContext";

import { GoKebabVertical } from "react-icons/go";

const CardBtns = ({
  dataPost,
  handleShowCardModal,
  onValidate,
  handleShowDeleteModal,
}) => {
  const userContext = useContext(UserContext);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = parseInt(userContext.userId(), 10);
  const role = userContext.role();

  // toggle for btn-kebab :
  const [item, setItem] = useState(false);
  const handleStateItem = () => {
    setItem(!item);
  };

  if (dataPost.p_fk_user_id === id) {
    return (
      <div className="d-flex">
        {item && (
          <>
            <div className=" d-flex">
              <span
                className="text-danger"
                style={{ cursor: "pointer" }}
                // onClick={(e) => submitToApiDelete(e, postId, config)}

                onClick={(e) => {
                  handleShowDeleteModal();
                }}
              >
                Supprimer
              </span>
              <span
                className="text-end ps-2 "
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  handleShowCardModal();
                  onValidate();
                }}
              >
                Modifier
              </span>
            </div>
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
              // onClick={(e) => submitToApiDelete(e, postId, config)}
              onClick={(e) => {
                handleShowDeleteModal();
              }}
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

export default CardBtns;
