import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import cat from "../Assets/Gif/ready-cat.gif";
import removeCat from "../Assets/Gif/remove-cat.gif";

import UserContext from "../Context/UserContext";
import userService from "../services/userService.js";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Image from "react-bootstrap/Image";

const DeleteModal = ({ handleClose, show, dataPost, onValidate, dataUser }) => {
  const navigate = useNavigate();
  const userContext = useContext(UserContext);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = userContext.userId();
  const logoutHandler = () => {
    userContext.logout();
    navigate("/signup", { replace: true });
  };
  // console.log(window.location.pathname);

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
            {window.location.pathname === "/profile/:id"
              ? "Alors on supprime votre compte ?"
              : "Supprimer la publication ?"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {window.location.pathname === "/profile/:id" && (
            <Image src={cat} alt={cat} fluid />
          )}
          {window.location.pathname === "/" && (
            <Image src={removeCat} alt={removeCat} className="w-100" fluid />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {window.location.pathname === "/profile/:id"
              ? "Non, pas encore"
              : "Oh, NON !"}
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              window.location.pathname === "/"
                ? submitToApiDeletePost(dataPost.p_id, config)
                : submitToApiDeleteUser(id, config);
            }}
          >
            {window.location.pathname === "/profile/:id"
              ? "Oui, au revoir !"
              : "Oui, à la poubelle !"}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DeleteModal;
