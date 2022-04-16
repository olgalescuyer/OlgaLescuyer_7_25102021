import React, { useState, useEffect, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";

import userService from "../../../services/userService.js";
import validService from "../../../services/validService";
import UserContext from "../../../Context/UserContext";

import DeleteModal from "../../DeleteModal.jsx";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Offcanvas from "react-bootstrap/Offcanvas";
import Image from "react-bootstrap/Image";

import image from "../../../Assets/Gif/no-way-cat.gif";

const FormProfile = ({ dataUser, onValidate }) => {
  const userContext = useContext(UserContext);
  const id = userContext.userId();
  const token = userContext.token;

  const refInputPass = useRef();
  const refInputControlPass = useRef();
  const navigate = useNavigate();

  const customMessage = validService.messages();
  const validRegex = validService.regex();

  // toggles :
  // -----toggle for show alert "DeleteModal" :
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  // ----toggle for OffCanvas :
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // ----toggle for btns & gields :
  const [toggle, setToggle] = useState({
    field: true,
    fieldPass: true,
    btnConfirm: true,
    btnConfirmDisabled: true,
    btnChangePass: true,
    btnPassDisabled: true,
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

  // ------------------------------------------------

  const [dataNewUser, setDataNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    controlPassword: "",
  });

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

  // ------------------------------------------------

  // for warning messages & regex from validService:
  const [oneErr, setOneErr] = useState(false);
  const handleOneErr = () => {
    setOneErr(true);
  };

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

  const createErrMessage = (data) => {
    setMessage((prevMessage) => {
      return {
        ...prevMessage,
        firstName: validRegex.firstName.test(data.firstName)
          ? ""
          : customMessage.firstName,
        lastName: validRegex.lastName.test(data.lastName)
          ? ""
          : customMessage.lastName,
        email: validRegex.email.test(data.email) ? "" : customMessage.email,
        password: validRegex.password.test(data.password)
          ? ""
          : customMessage.password,
        controlPassword: validRegex.controlPassword.test(data.controlPassword)
          ? ""
          : customMessage.controlPassword,
      };
    });
  };

  // grabe a new values & check the errors & create an error messages :
  const handleChange = (event) => {
    event.preventDefault();

    // ---grabe the new values :
    setDataNewUser((prevDataNewUser) => {
      return {
        ...prevDataNewUser,
        [event.target.name]: event.target.value,
      };
    });

    createErrMessage(dataNewUser);

    handleToggle("btnConfirm", false);
    handleToggle("btnConfirmDisabled", true);
    setMessageValidation("");
    setOneErr(false);
  };

  // -------------- //

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();

    const checkField = () => {
      const userObj = {
        firstName: validRegex.firstName.test(dataNewUser.firstName)
          ? dataNewUser.firstName
          : createErrMessage(dataNewUser),
        lastName: validRegex.lastName.test(dataNewUser.lastName)
          ? dataNewUser.lastName
          : createErrMessage(dataNewUser),
        email: validRegex.email.test(dataNewUser.email)
          ? dataNewUser.email
          : createErrMessage(dataNewUser),
      };

      if (userObj.firstName && userObj.lastName && userObj.email) {
        formData.append("user", JSON.stringify(userObj));
        // console.log(JSON.stringify(userObj));

        submitToApiPut(id, formData, token);

        handleToggle("field", true);
        handleToggle("fieldPass", true);
      } else {
        createErrMessage(dataNewUser);
        handleOneErr();
      }
    };

    const checkPass = () => {
      const userPass = {
        password: validRegex.password.test(dataNewUser.password)
          ? dataNewUser.password
          : createErrMessage(dataNewUser),
      };

      if (
        validRegex.password.test(dataNewUser.password) &&
        validRegex.controlPassword.test(dataNewUser.controlPassword) &&
        refInputPass.current.value === refInputControlPass.current.value
      ) {
        formData.append("user", JSON.stringify(userPass));
        submitToApiPutPass(id, formData, token);

        dataUser.u_first_name !== dataNewUser.firstName ||
        dataUser.u_last_name !== dataNewUser.lastName ||
        dataUser.u_email !== dataNewUser.email
          ? handleToggle("btnConfirm", false)
          : handleToggle("btnConfirm", true);

        handleToggle("field", true);
        handleToggle("fieldPass", true);
        handleToggle("btnPassDisabled", false);
        handleToggle("btnChangePass", true);
      } else {
        createErrMessage(dataNewUser);
        handleOneErr();
      }

      if (refInputPass.current.value !== refInputControlPass.current.value) {
        setMessageValidation(": MOTS DE PASSE ne correspondent pas");
      } else {
        setMessageValidation("");
      }
    };

    toggle.field ? checkField() : checkPass();
  };

  const submitToApiPut = (id, data, token) => {
    userService
      .modifyUser(id, data, token)
      .then((response) => {
        handleToggle("btnConfirmDisabled", false);
        onValidate();
        cleanMessage();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitToApiPutPass = (id, data, token) => {
    userService
      .updateUserPass(id, data, token)
      .then((response) => {
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

  // custom cleanup function :
  const cancelCoursPass = () => {
    handleToggle("btnChangePass", true);

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

  const cleanMessage = () => {
    setMessage((prevMessage) => {
      return {
        ...prevMessage,
        firstName: "",
        lastName: "",
        email: "",
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

          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.firstName}
          </Form.Text>
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
          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.lastName}
          </Form.Text>
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
          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.email}
          </Form.Text>
        </Form.Group>

        {toggle.btnChangePass && (
          <Button
            variant="outline-secondary"
            className={
              !toggle.btnPassDisabled
                ? "w-100 mb-4 disabled btn-outline-success"
                : "w-100 mb-4"
            }
            onClick={() => {
              handleToggle("fieldPass", false);
              handleToggle("field", false);

              handleToggle("btnConfirm", true);
              handleToggle("btnChangePass", false);
              setOneErr(false);
              setMessage((prevMessage) => {
                return {
                  ...prevMessage,
                  password: "",
                  controlPassword: "",
                };
              });
            }}
          >
            {!toggle.btnPassDisabled
              ? "Mot de passe a été changé"
              : "Changer de mot de passe ?"}
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
          <Form.Text className="d-block text-danger fst-italic ps-2">
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
          <Form.Text className="d-block text-danger fst-italic ps-2">
            {message.controlPassword}
          </Form.Text>
        </Form.Group>

        {oneErr && (
          <Form.Text className="d-block rounded text-center p-2 fw-bold text-danger ">
            Veuillez vérifier {!dataNewUser.firstName ? "PRENOM" : ""}{" "}
            {!dataNewUser.lastName ? "NOM" : ""}{" "}
            {!dataNewUser.email ? "ADRESSE E-MAIL" : ""} pour continuer{" "}
            {messageValidation}
          </Form.Text>
        )}

        {!toggle.btnConfirm && (
          <Button
            variant="primary"
            type="submit"
            className={
              toggle.btnConfirmDisabled
                ? "w-100 mb-4"
                : "w-100 mb-4 disabled btn-success"
            }
          >
            {toggle.btnConfirmDisabled
              ? "Confirmer les modifications"
              : "Modifié"}
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
          Retour
        </Button>

        <Button
          variant="danger"
          className="w-100"
          onClick={() => {
            dataUser.u_admin === 1 ? handleShow() : handleShowDeleteModal();
          }}
        >
          Supprimer le compte
        </Button>
      </Form>

      <DeleteModal
        handleClose={handleCloseDeleteModal}
        show={showDeleteModal}
        onValidate={onValidate}
        dataUser={dataUser}
      />

      <Offcanvas show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {dataUser.u_first_name} {dataUser.u_last_name}
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          Vous êtes adimistrateur & modérateur de l'app Groupomania. Pour
          supprimer votre compte veuillez contacter le Sys Admin. Merci
        </Offcanvas.Body>
        <Image src={image} alt={image} fluid />
      </Offcanvas>
    </>
  );
};

export default FormProfile;
