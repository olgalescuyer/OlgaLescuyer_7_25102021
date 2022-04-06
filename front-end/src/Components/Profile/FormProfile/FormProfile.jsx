import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../services/userService.js";
import validService from "../../../services/validService";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const FormProfile = ({ dataUser }) => {
  // console.log(dataUser);
  const navigate = useNavigate();
  const customMessage = validService.messages();
  const validRegex = validService.regex();

  const [dataNewUser, setDataNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
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
      };
    });
  };

  useEffect(() => {
    handleValue();
  }, [dataUser]);
  // console.log(dataUser);

  // grabe a new values :
  const handleChange = (event) => {
    handleToggle("btnConfirm", false);

    // userField = event.target
    validate(
      event.target,
      validRegex[event.target.attributes.name.value],
      dataNewUser
    );

    setDataNewUser((prevDataNewUser) => {
      return {
        ...prevDataNewUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  // for warning messages & regex from validService:
  const [message, setMessage] = useState({
    firstName: "",
    lastName: "",
    email: " ",
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

  // -------------- //

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      validRegex.firstName.test(dataNewUser.firstName) &&
      validRegex.lastName.test(dataNewUser.lastName) &&
      validRegex.email.test(dataNewUser.email)
    ) {
      console.log(dataNewUser);
    } else {
      console.log("not");
    }
  };

  // toggles :
  const [toggle, setToggle] = useState({
    btnConfirm: true,
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
        <Form.Text className="text-danger ps-2 ">{message.firstName}</Form.Text>
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
        <Form.Text className="text-danger ps-2 ">{message.lastName}</Form.Text>
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
        <Form.Text className="text-danger ps-2 ">{message.email}</Form.Text>
      </Form.Group>

      {/* <Form.Group className="position-relative mb-3" controlId="password">
        <FloatingLabel
          controlId="password"
          label="Mot de passe"
          className="text-muted fst-italic"
        >
          <Form.Control
            type="password"
            className="border-top-0 border-end-0 border-start-0 "
            placeholder="paassword"
            name="password"
            onChange={handleChange}
            value={password}
          />
        </FloatingLabel>
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group> */}

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
        Annuler les modifications
      </Button>

      <Button variant="danger" className="w-100">
        Supprimer le compte
      </Button>
    </Form>
  );
};

export default FormProfile;
