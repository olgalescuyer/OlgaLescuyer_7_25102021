import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormLoginBtns from "./FormLoginBtns.jsx";
import axios from "axios";

const FormLogin = () => {
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });
  // console.log(dataUser);

  const handleChange = (event) => {
    // console.log(event.target.value)

    setDataUser((prevDataUser) => {
      return {
        ...prevDataUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = JSON.stringify(dataUser);
    submitToApi(dataUser);
  };

  const submitToApi = (data) => {
    console.log(data);
    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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

      <FormLoginBtns login={"Se connecter"} signup={`S'inscrire`} />
    </Form>
  );
};

export default FormLogin;
