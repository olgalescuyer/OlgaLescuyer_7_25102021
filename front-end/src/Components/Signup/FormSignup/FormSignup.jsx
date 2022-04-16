import React, { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormSignupBtns from "./FormSignupBtns.jsx";
import validService from "../../../services/validService";
import authService from "../../../services/authService";

import UserContext from "../../../Context/UserContext";

const FormSignup = () => {
  const navigate = useNavigate();
  const refInputPass = useRef();
  const refInputControlPass = useRef();
  const validRegex = validService.regex();
  const customMessage = validService.messages();
  const userContext = useContext(UserContext);

  // create an object for grabing the data :
  const [dataUser, setDataUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    controlPassword: "",
    admin: 0,
  });

  // console.log(dataUser);

  // - for warning messages :
  const [oneErr, setOneErr] = useState(false);
  const handleOneErr = (bool) => {
    setOneErr(bool);
  };
  const [messageValidation, setMessageValidation] = useState("");

  // ---currents errors :
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: " ",
    password: "",
    controlPassword: "",
  });

  // userField= event.target
  const createErrMessage = (userField) => {
    setMessage((prevMessage) => {
      return {
        ...prevMessage,
        [userField.name]: !validRegex[userField.attributes.name.value].test(
          userField.value
        )
          ? customMessage[userField.name]
          : "",
      };
    });
  };

  const handleChange = (event) => {
    event.preventDefault();

    createErrMessage(event.target);

    setDataUser((prevDataUser) => {
      return {
        ...prevDataUser,
        [event.target.name]: event.target.value,
      };
    });

    setOneErr(false);

    setMessageValidation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validRegex.firstName.test(dataUser.firstName) &&
      validRegex.lastName.test(dataUser.lastName) &&
      validRegex.email.test(dataUser.email) &&
      validRegex.password.test(dataUser.password) &&
      validRegex.controlPassword.test(dataUser.controlPassword) &&
      refInputPass.current.value === refInputControlPass.current.value
    ) {
      submitToApi(dataUser);
    } else {
      handleOneErr(true);
    }

    if (refInputPass.current.value !== refInputControlPass.current.value) {
      setMessageValidation("Mots de passe ne correspondent pas");
    } else {
      setMessageValidation("");
    }
  };

  const submitToApi = (data) => {
    authService
      .signup(data)
      .then((response) => {
        // console.log(response);
        userContext.login(
          response.data.token,
          response.data.userId,
          response.data.role
        );

        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.log(error);
        setMessageValidation("L'adresse email a été déjà utilisée");
        handleOneErr();
      });
  };

  return (
    <Form onSubmit={handleSubmit} className="pb-4">
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
          <Form.Text className="d-block text-danger fst-italic ps-2">
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

          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.lastName}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="position-relative" controlId="email">
        <FloatingLabel
          controlId="email"
          label="nom.prenom@groupomania.fr"
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

          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.email}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="position-relative" controlId="password">
        <FloatingLabel
          controlId="password"
          label="Mot de passe"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="password"
            className="border-top-0 border-end-0 border-start-0 "
            placeholder="password"
            name="password"
            onChange={handleChange}
            value={dataUser.password}
            ref={refInputPass}
          />

          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.password}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="position-relative" controlId="controlPassword">
        <FloatingLabel
          controlId="controlPassword"
          label="Confirmation de mot de passe"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="password"
            className="border-top-0 border-end-0 border-start-0 "
            placeholder="controlPassword"
            name="controlPassword"
            onChange={handleChange}
            value={dataUser.controlPassword}
            ref={refInputControlPass}
          />

          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.controlPassword}
          </Form.Text>
        </FloatingLabel>
      </Form.Group>
      <Form.Text className="d-block rounded text-center p-2 fw-bold text-danger ">
        {" "}
        {messageValidation}
      </Form.Text>
      {oneErr && (
        <Form.Text className="d-block rounded text-center p-2 fw-bold text-danger ">
          Veuillez vérifier {!dataUser.firstName ? "PRENOM" : ""}{" "}
          {!dataUser.lastName ? "NOM" : ""}{" "}
          {!dataUser.email ? "ADRESSE E-MAIL" : ""}{" "}
          {!dataUser.password ? "MOT de PASSE" : ""} pour continuer{" "}
        </Form.Text>
      )}

      <FormSignupBtns signup={`S'inscrire`} login={"Se connecter"} />
    </Form>
  );
};

export default FormSignup;
