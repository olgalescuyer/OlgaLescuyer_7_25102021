import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormSignupBtns from "./FormSignupBtns.jsx";
// import validService from "../../../services/validService";
import authService from "../../../services/authService";

const FormSignup = () => {
  const navigate = useNavigate();

  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  // console.log(dataUser);

  const inputRegex = {
    firstName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    lastName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    email: /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+groupomania.fr$/,
  };

  const invalid = {
    firstName: "Vérifiez le prénom. Ce champ accepte uniquement les lettres.",
    lastName: "Vérifiez le prénom. Ce champ accepte uniquement les lettres.",
    email: "Saisissez une adresse électronique correcte ",
    password: "Le mot de passe Doit Contenir au Moins 8 Caractères et une minute de 1 Minuscule, 1 Majuscule, 1 chiffre, 1 symbole.",
  };

  // console.log(invalid);

  const validate = (userField, regex) => {
    regex.test(userField.value) ? console.log("valid") : console.log(invalid[userField.name]);
    // console.log(regex.test(field.value));
  };

  const handleChange = (event) => {
    const userField = event.target;
    // console.log(userField);
    // console.log(inputRegex[event.target.attributes.name.value]);

    validate(userField, inputRegex[event.target.attributes.name.value]);

    setDataUser((prevDataUser) => {
      console.log(prevDataUser);

      return {
        ...prevDataUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // if (
    //   inputRegex.firstName.test(dataUser.firstName) &&
    //   inputRegex.lastName.test(dataUser.lastName) &&
    //   inputRegex.email.test(dataUser.email) &&
    //   inputRegex.password.test(dataUser.password)
    // ) {
    //   submitToApi(dataUser);
    //   navigate("/");
    // } else {
    //   console.log(
    //     "userName: Only Characters with white space are allowed; password:Password Must Be at Least 8 Characters & a min of: 1 Lowercase, 1 Uppercase, 1 number, 1 symbol; email:It must be something like this : your.name@groupomania.fr "
    //   );

    // }
  };

  const submitToApi = (data) => {
    // console.log(data);

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
          some warning...
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
          <Form.Text className="text-muted ps-2 ">
            Vérifiez le prénom. Ce champ accepte uniquement les lettres.
          </Form.Text>
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
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          Saisissez une adresse électronique correcte :
          prenom.nom@groupomania.fr
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
          Le mot de passe Doit Contenir au Moins 8 Caractères et une minute de:
          1 Minuscule, 1 Majuscule, 1 chiffre, 1 symbole.
        </Form.Text>
      </Form.Group>

      <FormSignupBtns signup={`S'inscrire`} login={"Se connecter"} />
    </Form>
  );
};

export default FormSignup;
