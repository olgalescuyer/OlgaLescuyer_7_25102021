import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { RiCloseCircleLine } from "react-icons/ri";

const CardModal = ({ onClose, show }) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modifier l'article</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3 text-muted fst-italic" controlId="title">
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
            <Form.Check type="checkbox" label="Supprimer l'image définitivement?" />
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
  );
};

export default CardModal;
