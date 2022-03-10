import React, { useState, useContext, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import UserContextTest from "../../../Context/UserContextTest";
import userService from "../../../services/userService.js";

const CardModal = ({ onClose, show, postId }) => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };

  const [dataPost, setDataPost] = useState("");

  useEffect(() => {
    userService
      .getOnePost(postId, config)
      .then((response) => {
        // console.log("response : ", response);
        setDataPost(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'article{dataPost.p_id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group
              className="mb-3 text-muted fst-italic"
              controlId="title"
            >
              <FloatingLabel controlId="title" label="Nouveau titre (max 255)">
                <Form.Control type="text" placeholder="title" name="title" />
              </FloatingLabel>

              <Form.Text className="text-muted ps-2 d-none">
                some warning...
              </Form.Text>
            </Form.Group>

            <Form.Group
              className=" position-relative text-muted fst-italic"
              controlId="text"
            >
              <FloatingLabel controlId="text" label="Nouveau text (max 255)">
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="text"
                  style={{ height: "100px" }}
                  name="text"
                />
              </FloatingLabel>
              <Form.Text className="d-block position-absolute ps-2 bottom-0 end-0 fw-bold text-danger "></Form.Text>
            </Form.Group>
            <div className="mt-3">
              <Image fluid rounded src={dataPost.p_image} />
            </div>

            <Form.Group controlId="imageUrl" className="mb-3">
              <Form.Label></Form.Label>
              <Form.Control
                type="file"
                name="imageUrl"
                className="text-muted fst-italic"
                accept="image/*"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="checkbox">
              <Form.Check
                type="checkbox"
                label="Supprimer l'image définitivement?"
              />
            </Form.Group>

            <Button variant="secondary" onClick={onClose}>
              Annuler
            </Button>
            <Button variant="primary" className="ms-3" onClick={onClose}>
              Confirmer les modifications
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardModal;
