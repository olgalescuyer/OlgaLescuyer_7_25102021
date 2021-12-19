import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import HeaderPost from "../Post/HeaderPost";
import Btns from "./Btns.jsx";

const FormPost = () => {
  return (
    <Form className="rounded p-3 mb-1 custom-color-body">
      <HeaderPost />
      <Form.Group className="mb-3 text-muted fst-italic" controlId="title">
        <FloatingLabel controlId="title" label="Titre">
          <Form.Control type="text" placeholder="title" className="" />
        </FloatingLabel>

        <Form.Text className="text-muted ps-2 d-none">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="text-muted fst-italic" controlId="text">
        <FloatingLabel controlId="text" label="What's on your mind ?">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="text"
            style={{ height: "100px" }}
          />
        </FloatingLabel>
      </Form.Group>

      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="file" className="text-muted fst-italic" />
      </Form.Group>

      <Btns />
    </Form>
  );
};

export default FormPost;
