import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormLoginBtns from "./FormLoginBtns.jsx";
import axios from "axios";

const FormLogin = () => {
  const navigate = useNavigate();
  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });
  // console.log(dataUser);

  const inputRegex = {
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    email: /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+groupomania.fr$/,
  };

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
    if (
      inputRegex.email.test(dataUser.email) &&
      inputRegex.password.test(dataUser.password)
    ) {
      submitToApi(dataUser);
      navigate("/");
    } else {
      console.log(
        " password:Password Must Be at Least 8 Characters & a min of: 1 Lowercase, 1 Uppercase, 1 number, 1 symbol; email:It must be something like this : your.name@groupomania.fr "
      );
    }
  };

  const submitToApi = (data) => {
    console.log(data);

    axios
      .post("http://localhost:3000/api/auth/login", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
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
