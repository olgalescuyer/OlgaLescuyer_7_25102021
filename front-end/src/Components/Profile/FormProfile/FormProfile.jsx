import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../services/userService.js";
import validService from "../../../services/validService";
import UserContextTest from "../../../Context/UserContextTest";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

import image from "../../../Assets/Gif/no-way-cat.gif";

const FormProfile = ({ dataUser, validateHandler }) => {
  const userContext = useContext(UserContextTest);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = userContext.userId();
  const token = userContext.token;
  // console.log(dataUser);
  const refInputPass = useRef();
  const refInputControlPass = useRef();
  const navigate = useNavigate();
  const customMessage = validService.messages();
  const validRegex = validService.regex();

  const logoutHandler = () => {
    userContext.logout();
    navigate("/login", { replace: true });
  };

  // toggles :
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [toggle, setToggle] = useState({
    btnConfirm: true,
    field: true,
    fieldPass: true,
    btnDisabled: true,
    btnChangePass: true,
  });

  // console.log(toggle);

  const handleToggle = (key, value) => {
    // console.log(key, value);
    setToggle((prevToggle) => {
      return {
        ...prevToggle,
        [key]: value,
      };
    });
  };

  const [dataNewUser, setDataNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    controlPassword: "",
  });

  console.log(dataUser);

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

  // for warning messages & regex from validService:
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

    // console.log(dataNewUser);

    // ---create the error messages :

    handleToggle("btnConfirm", false);
    setMessageValidation("");
    setOneErr(false);

    if (refInputPass.current.value !== refInputControlPass.current.value) {
      setMessageValidation("Mots de passe ne correspondent pas");
    } else {
      setMessageValidation("");
    }

    // func for compare with regex -> userField = event.target :
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
    const formData = new FormData();
    const checkPass = () => {
      if (
        validRegex.password.test(dataNewUser.password) &&
        validRegex.controlPassword.test(dataNewUser.controlPassword) &&
        refInputPass.current.value === refInputControlPass.current.value
      ) {
        const userPass = {
          password: dataNewUser.password,
        };

        formData.append("user", JSON.stringify(userPass));
        // console.log(JSON.stringify(userObj));
        submitToApiPutPass(id, formData, token);

        dataUser.u_first_name !== dataNewUser.firstName ||
        dataUser.u_last_name !== dataNewUser.lastName ||
        dataUser.u_email !== dataNewUser.email
          ? handleToggle("btnConfirm", false)
          : handleToggle("btnConfirm", true);

        console.log("ok pass");
        handleToggle("field", true);
        handleToggle("fieldPass", true);
        handleToggle("btnDisabled", false);
        handleToggle("btnChangePass", true);
      } else {
        setOneErr(true);
        console.log("err pass");
      }
    };

    const check = () => {
      if (
        validRegex.firstName.test(dataNewUser.firstName) &&
        validRegex.lastName.test(dataNewUser.lastName) &&
        validRegex.email.test(dataNewUser.email)
      ) {
        const userObj = {
          firstName: dataNewUser.firstName,
          lastName: dataNewUser.lastName,
          email: dataNewUser.email,
        };

        formData.append("user", JSON.stringify(userObj));
        // console.log(JSON.stringify(userObj));

        submitToApiPut(id, formData, token);
        navigate("/");

        handleToggle("field", true);
        handleToggle("fieldPass", true);
      } else {
        setOneErr(true);
      }
      // submitToApiPut();
    };

    toggle.field ? check() : checkPass();
    // console.log(toggle.field);
  };

  const submitToApiPut = (id, data, token) => {
    userService
      .modifyUser(id, data, token)
      .then((response) => {
        console.log(response);
        validateHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitToApiPutPass = (id, data, token) => {
    userService
      .updateUserPass(id, data, token)
      .then((response) => {
        console.log(response);

        setDataNewUser((prevDataNewUser) => {
          return {
            ...prevDataNewUser,
            password: "",
            controlPassword: "",
          };
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitToApiDelete = (userId, config) => {
    userService
      .deleteUser(userId, config)
      .then((response) => {
        console.log(response);
        logoutHandler();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // custom cleanup function :
  const cancelCoursPass = () => {
    handleToggle("btnChangePass", true);
    // handleToggle("btnConfirm", true);
    handleToggle("field", true);
    handleToggle("fieldPass", true);
    setMessageValidation("");

    dataUser.u_first_name !== dataNewUser.firstName ||
    dataUser.u_last_name !== dataNewUser.lastName ||
    dataUser.u_email !== dataNewUser.email
      ? handleToggle("btnConfirm", false)
      : handleToggle("btnConfirm", true);

    setMessage((prevMessage) => {
      return {
        ...prevMessage,
        password: "",
        controlPassword: "",
      };
    });
    setDataNewUser((prevDataNewUser) => {
      return {
        ...prevDataNewUser,
        password: "",
        controlPassword: "",
      };
    });
  };

  return (
    <>
      <Form
        className="w-custom-limit-400"
        style={{ paddingBottom: "100px" }}
        onSubmit={handleSubmit}
      >
        <Form.Group
          className={toggle.field ? "position-relative mb-3" : "d-none"}
          controlId="firstName"
        >
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

        <Form.Group
          className={toggle.field ? "position-relative mb-3" : "d-none"}
          controlId="lastName"
        >
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

        <Form.Group
          className={toggle.field ? "position-relative mb-3" : "d-none"}
          controlId="email"
        >
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

        {toggle.btnChangePass && (
          <Button
            variant="outline-secondary"
            className={
              !toggle.btnDisabled ? "w-100 mb-4 disabled" : "w-100 mb-4"
            }
            onClick={() => {
              handleToggle("fieldPass", false);
              handleToggle("field", false);

              handleToggle("btnConfirm", true);
              handleToggle("btnChangePass", false);
              setOneErr(false);
            }}
          >
            {!toggle.btnDisabled
              ? "Mot de pass a été changé"
              : "Changer de mot de pass ?"}
          </Button>
        )}

        <Form.Group
          className={!toggle.fieldPass ? "position-relative mb-3" : "d-none"}
          controlId="password"
        >
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
          onClick={() => {
            setOneErr(false);
            toggle.field ? navigate("/") : cancelCoursPass();
          }}
        >
          Annuler
        </Button>

        <Button
          variant="danger"
          className="w-100"
          onClick={() => {
            dataUser.u_admin === 1
              ? handleShow()
              : submitToApiDelete(id, config);
          }}
        >
          Supprimer le compte
        </Button>
      </Form>

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {dataNewUser.firstName} {dataNewUser.lastName}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Vous êtes adimistrateur & modérateur de l'app Groupomania. Pour
          supprimer votre compte veuillez contacter le Sys Admin. Merci
        </Offcanvas.Body>
        <Image src={image} fluid />
      </Offcanvas>
    </>
  );
};

export default FormProfile;
