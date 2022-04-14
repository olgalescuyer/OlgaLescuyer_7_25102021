import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import UserContext from "../Context/UserContext";
import userService from "../services/userService.js";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const DeleteModal = ({ handleClose, show, dataPost, onValidate,dataUser }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = userContext.userId();
  const token = userContext.token;
  const logoutHandler = () => {
    userContext.logout();
    navigate("/signup", { replace: true });
  };
  // console.log(window.location.pathname);
  console.log(dataUser);

  //  call to API for delete one post :
  const submitToApiDeletePost = (postId, config) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => {
        handleClose();
        onValidate();
      })
      .catch((err) => console.log(err));
  };

  //  call to API for delete a current user :
  const submitToApiDeleteUser = (userId, config) => {
    console.log("from delete user", userId);
    userService
      .deleteUser(userId, config)
      .then((response) => {
        // console.log(response);
        logoutHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {/* {dataUser.u_first_name} {dataUser.u_last_name} */}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>Confirmez la suppression</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Annuler
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              window.location.pathname === "/"
                ? submitToApiDeletePost(dataPost.p_id, config)
                : submitToApiDeleteUser(id, config);
            }}
          >
            Confirmer la suppression
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
