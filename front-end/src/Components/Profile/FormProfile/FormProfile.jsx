import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Btns from "./Btns.jsx";

const FormProfile = () => {
  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  console.log(dataUser);

  const handleChange = (event) => {
    // console.log(event.target.value)
    event.preventDefault();
    setDataUser((prevDataUser) => {
      return {
        ...prevDataUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataUser);
    // submitToApi(dataUser)
  };

  return (
    <Form className="w-custom-limit-400" onSubmit={handleSubmit}>
      <Form.Group className="position-relative mb-3" controlId="firstName">
        <FloatingLabel
          controlId="firstName"
          label="Prénom(var)"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="text"
            className="border-top-0 border-end-0 border-start-0"
            placeholder="firstName"
            name="firstName"
            onChange={handleChange}
            value={dataUser.firstName}
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="lastName">
        <FloatingLabel
          controlId="lastName"
          label="Nom(var)"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="text"
            className="border-top-0 border-end-0 border-start-0"
            placeholder="lastName"
            name="lastName"
            onChange={handleChange}
            value={dataUser.lastName}
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="email">
        <FloatingLabel
          controlId="email"
          label="your.name@groupomania.fr(var)"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="email"
            className="border-top-0 border-end-0 border-start-0"
            placeholder="email"
            name="email"
            onChange={handleChange}
            value={dataUser.email}
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="password">
        <FloatingLabel
          controlId="password"
          label="Password(var*****)"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="password"
            className="border-top-0 border-end-0 border-start-0 "
            placeholder="paassword"
            name="password"
            onChange={handleChange}
            value={dataUser.password}
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Btns />
    </Form>
  );
};

export default FormProfile;
