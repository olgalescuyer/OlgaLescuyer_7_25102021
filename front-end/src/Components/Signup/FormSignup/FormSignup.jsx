import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import FormSignupBtns from "./FormSignupBtns.jsx";

const FormSignup = () => {
  const queryStringUrl = window.location.pathname;
  console.log(queryStringUrl);
  const nameRoute = queryStringUrl.slice(1);
  console.log(nameRoute);

  return (
    <Form className="">
      <Form.Group className="position-relative mb-3" controlId="firstName">
        <FloatingLabel
          controlId="firstName"
          label="Prénom"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="text"
            className="border-top-0 border-end-0 border-start-0"
            placeholder="firstName"
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="lastName">
        <FloatingLabel
          controlId="lastName"
          label="Nom"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="text"
            className="border-top-0 border-end-0 border-start-0"
            placeholder="firstName"
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="email">
        <FloatingLabel
          controlId="email"
          label="your.name@groupomania.fr"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="email"
            className="border-top-0 border-end-0 border-start-0"
            placeholder="email"
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="password">
        <FloatingLabel
          controlId="password"
          label="Password"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="password"
            className="border-top-0 border-end-0 border-start-0 "
            placeholder="paassword"
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <FormSignupBtns signup={`S'inscrire`} login={"Se connecter"} />
    </Form>
  );
};

export default FormSignup;
