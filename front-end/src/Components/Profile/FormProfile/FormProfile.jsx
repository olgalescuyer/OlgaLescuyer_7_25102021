import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../services/userService.js";
import validService from "../../../services/validService";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const FormProfile = ({ dataUser }) => {
  // console.log(dataUser);
  const refInputPass = useRef();
  const refInputControlPass = useRef();
  const navigate = useNavigate();
  const customMessage = validService.messages();
  const validRegex = validService.regex();

  const [dataNewUser, setDataNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    controlPassword: "",
  });

  // console.log(dataNewUser);

  // grab the value from db + dependency of dataUser for update values :
  const handleValue = () => {
    setDataNewUser((prevDataNewUser) => {
      return {
        ...prevDataNewUser,

        firstName: dataUser.u_first_name,
        lastName: dataUser.u_last_name,
        email: dataUser.u_email,
        password: "",
        controlPassword: "",
      };
    });
  };

  useEffect(() => {
    handleValue();
  }, [dataUser]);
  // console.log(dataUser);



  // for warning messages & regex from validService:
  // ---message then all the fields have some errors :
  const [oneErr, setOneErr] = useState(false);
  // ---message for compare a new password :
  const [messageValidation, setMessageValidation] = useState("");
  // ---currents errors :
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: " ",
    password: "",
    controlPassword: "",
  });

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
      case "controlPassword":
        setMessage({ controlPassword: customMessage.controlPassword });
        break;
      default:
        console.log("default from switch");
    }
  }

  // ---check regex if not -> create a warning message :
  const validate = (userField, regex) => {
    if (!regex.test(userField.value)) {
      createErrMessage(userField);
      return;
    } else {
      setMessage("");
    }
  };

    // grabe a new values & check the errors & create an error messages :
    const handleChange = (event) => {
      event.preventDefault();

      console.log(dataNewUser);
      
      // ---create the error messages :
      handleToggle("btnConfirm", false);
      setMessageValidation("");

      if (refInputPass.current.value !== refInputControlPass.current.value) {
        setMessageValidation("Mots de passe ne correspondent pas");
      } else {
        setMessageValidation("");
      }
  
      // userField = event.target
      validate(event.target, validRegex[event.target.attributes.name.value]);
  
      // ---grabe the new values :
      setDataNewUser((prevDataNewUser) => {
        return {
          ...prevDataNewUser,
          [event.target.name]: event.target.value,
        };
      });
    };

  // -------------- //

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validRegex.firstName.test(dataNewUser.firstName) &&
      validRegex.lastName.test(dataNewUser.lastName) &&
      validRegex.email.test(dataNewUser.email) &&
      validRegex.password.test(dataNewUser.password) &&
      validRegex.controlPassword.test(dataNewUser.controlPassword) &&
      refInputPass.current.value === refInputControlPass.current.value
    ) {
      submitToApiPut();
    } else {
      setOneErr(true);
    }
  };

  const submitToApiPut = () => {
    console.log(dataNewUser);
  };

  // toggles :
  const [toggle, setToggle] = useState({
    btnConfirm: true,
    btnChange: true,
  });

  const handleToggle = (key, value) => {
    // console.log(key, value);
    setToggle((prevToggle) => {
      return {
        ...prevToggle,
        [key]: value,
      };
    });
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
            value={dataNewUser.firstName}
            onChange={handleChange}
          />
        </FloatingLabel>
        <Form.Text className="text-danger ">{message.firstName}</Form.Text>
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
            value={dataNewUser.lastName}
          />
        </FloatingLabel>
        <Form.Text className="text-danger">{message.lastName}</Form.Text>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="email">
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
            value={dataNewUser.email}
          />
        </FloatingLabel>
        <Form.Text className="text-danger">{message.email}</Form.Text>
      </Form.Group>

      {toggle.btnChange && (
        <Button
          variant="outline-secondary"
          className="w-100 mb-4"
          onClick={() => {
            handleToggle("btnChange", false);
          }}
        >
          Changer de mot de pass ?
        </Button>
      )}

      {!toggle.btnChange && (
        <Form.Group className="position-relative mb-3" controlId="password">
          <FloatingLabel
            controlId="password"
            label="Nouveau mot de passe"
            className="text-muted fst-italic"
          >
            <Form.Control
              type="password"
              className="border-top-0 border-end-0 border-start-0 "
              placeholder="password"
              name="password"
              onChange={handleChange}
              value={dataNewUser.password}
              ref={refInputPass}
            />
          </FloatingLabel>
          <Form.Text className="text-danger ps-2 ">
            {message.password}
          </Form.Text>

          <FloatingLabel
            controlId="password"
            label="Confirmer Nouveau mot de passe"
            className="text-muted fst-italic"
          >
            <Form.Control
              type="password"
              className="border-top-0 border-end-0 border-start-0 "
              placeholder="controlPassword"
              name="controlPassword"
              onChange={handleChange}
              value={dataNewUser.controlPassword}
              ref={refInputControlPass}
            />
          </FloatingLabel>
          <Form.Text className="text-danger ps-2 ">
            {message.controlPassword}
            {messageValidation}
          </Form.Text>
        </Form.Group>
      )}

      {oneErr && (
        <Form.Text className="d-block rounded text-center p-2 fw-bold text-danger ">
          Tous les champs doivent être remplis correctement
        </Form.Text>
      )}

      {!toggle.btnConfirm && (
        <Button variant="primary" type="submit" className="w-100 mb-4">
          Confirmer les modifications
        </Button>
      )}

      <Button
        variant="secondary"
        className="w-100 mb-4"
        onClick={() => navigate("/")}
      >
        Annuler
      </Button>

      <Button variant="danger" className="w-100">
        Supprimer le compte
      </Button>
    </Form>
  );
};

export default FormProfile;
