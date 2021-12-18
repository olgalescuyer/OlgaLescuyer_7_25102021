import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import FormLoginBtns from "./FormLoginBtns.jsx";

const FormLogin = () => {
  const queryStringUrl = window.location.pathname;
  console.log(queryStringUrl);
  const nameRoute = queryStringUrl.slice(1);
  console.log(nameRoute);

  return (
    <Form className="">
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

      <FormLoginBtns login={"Se connecter"} signup={`S'inscrire`} />
    </Form>
  );
};

export default FormLogin;
