import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import FormSignupBtns from "./FormSignupBtns.jsx";

import validService from "../../../services/validService";
import authService from "../../../services/authService";

const FormSignup = () => {
  const navigate = useNavigate();
  const validRegex = validService.regex();
  const customMessage = validService.messages();

  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: " ",
    password: "",
  });

  const [oneErr, setOneErr] = useState(false);

  const handleChange = (event) => {
    validate(event.target, validRegex[event.target.attributes.name.value]);

    setDataUser((prevDataUser) => {
      // console.log(prevDataUser);
      return {
        ...prevDataUser,
        [event.target.name]: event.target.value,
      };
    });

    setOneErr(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validRegex.firstName.test(dataUser.firstName) &&
      validRegex.lastName.test(dataUser.lastName) &&
      validRegex.email.test(dataUser.email) &&
      validRegex.password.test(dataUser.password)
    ) {
      submitToApi(dataUser);
      navigate("/");
    } else {
      setOneErr(true);
    }
  };

  const validate = (userField, regex) => {
    if (!regex.test(userField.value)) {
      createErrMessage(userField);
    } else {
      setMessage("");
    }
  };

  function createErrMessage(field) {
    switch (field.name) {
      case "firstName":
        setMessage({ firstName: customMessage.firstName });
        break;
      case "lastName":
        setMessage({ lastName: customMessage.lastName });
        break;
      case "email":
        setMessage({ email: customMessage.email });
        break;
      case "password":
        setMessage({ password: customMessage.password });
        break;
      default:
        console.log("default from switch");
    }
  }

  const submitToApi = (data) => {
    authService
      .signup(data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="position-relative" controlId="firstName">
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
          <Form.Text className="text-muted ps-2 ">
            {message.firstName}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="position-relative" controlId="lastName">
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

          <Form.Text className="text-muted ps-2 ">{message.lastName}</Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="position-relative" controlId="email">
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

          <Form.Text className="text-muted ps-2 ">{message.email}</Form.Text>
        </FloatingLabel>
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

          <Form.Text className="text-muted ps-2">{message.password}</Form.Text>
        </FloatingLabel>
      </Form.Group>
      {oneErr && (
        <Form.Text className="d-block rounded text-center p-2 fw-bold alert-danger ">
          Tous les champs doivent être remplis
        </Form.Text>
      )}
      <FormSignupBtns signup={`S'inscrire`} login={"Se connecter"} />
    </Form>
  );
};

export default FormSignup;
