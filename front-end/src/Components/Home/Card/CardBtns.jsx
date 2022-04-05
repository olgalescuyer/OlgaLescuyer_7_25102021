import React, { useContext, useState, useEffect } from "react";
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
  const token = userContext.token;

  // toggle for btn kebab :
  const [item, setItem] = useState(false);
  const handleStateItem = () => {
    setItem(!item);
  };

  // call to API for delete one post :
  const submitToApiDelete = (e) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => onValidate())
      .catch((err) => console.log(err));
  };

  // state for creating a dependency on the state of CardModal & passing on useEffect  :
  const [addDataPost, setAddDataPost] = useState(false);
  const validateHandler = (bool) => {
    setAddDataPost(bool);
  };

  // post object from db :
  const [dataPost, setDataPost] = useState("");
  // console.log(dataPost);

  // call to API + dependency "addDataPost" for manage by onClick :
  useEffect(
    (PostId) => {
      if (addDataPost) {
        submitToApiGetPost(PostId, config);
      }
    },
    [addDataPost]
  );

  const submitToApiGetPost = (e) => {
    userService
      .getOnePost(postId, config)
      .then((response) => {
        // console.log("response ---------------------------------: ", response);
        setDataPost(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  // toggle for show the CardModal :
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
                onClick={(e) => submitToApiDelete(e, postId, config)}
              >
                Supprimer
              </span>
              <span
                className="text-end ps-2 "
                style={{ cursor: "pointer" }}
                onClick={(e) => {
                  handleShow();
                  submitToApiGetPost(e, postId, config);
                  validateHandler(true);
                }}
              >
                Modifier
              </span>
            </div>

            <CardModal
              onClose={handleClose}
              show={show}
              postId={postId}
              onValidate={onValidate}
              addDataPost={addDataPost}
              validateHandler={validateHandler}
              dataPost={dataPost}
            />
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
              onClick={(e) => submitToApiDelete(e, postId, config)}
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
