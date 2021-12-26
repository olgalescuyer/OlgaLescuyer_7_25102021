import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Btns from "./Btns.jsx";

const FormProfile = (props) => {
  console.log(props.firstName)
  const [dataUser, setDataUser] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    email: props.email,
    password: props.password,
  });
  console.log(dataUser);

  const inputRegex = {
    firstName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    lastName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    email: /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+groupomania.fr$/,
  };

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

    if (
      inputRegex.firstName.test(dataUser.firstName) &&
      inputRegex.lastName.test(dataUser.lastName) &&
      inputRegex.email.test(dataUser.email) &&
      inputRegex.password.test(dataUser.password)
    ) {
      console.log("regex ok");
      // submitToApi(dataUser);
    } else {
      console.log(
        "userName: Only Characters with white space are allowed; password:Password Must Be at Least 8 Characters & a min of: 1 Lowercase, 1 Uppercase, 1 number, 1 symbol; email:It must be something like this : your.name@groupomania.fr "
      );
    }
  };

  return (
    <Form className="w-custom-limit-400" onSubmit={handleSubmit}>
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
          label="Nom"
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
          label="your.name@groupomania.fr"
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
          label="Password"
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
