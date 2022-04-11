import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import FormLoginBtns from "./FormLoginBtns.jsx";
import authService from "../../../services/authService";
import validService from "../../../services/validService";
import UserContext from "../../../Context/UserContext";

const FormLogin = () => {
  const navigate = useNavigate();
  const validRegex = validService.regex();
  const customMessage = validService.messages();
  const userContext = useContext(UserContext);

  const [dataUser, setDataUser] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState({
    email: " ",
    password: "",
  });

  const [messageValidation, setMessageValidation] = useState("");

  const handleChange = (event) => {
    // console.log(event.target.value)
    validate(event.target, validRegex[event.target.attributes.name.value]);

    setDataUser((prevDataUser) => {
      return {
        ...prevDataUser,
        [event.target.name]: event.target.value,
      };
    });
    setMessageValidation("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      validRegex.email.test(dataUser.email) &&
      validRegex.password.test(dataUser.password)
    ) {
      submitToApi(dataUser);
    } else {
      setMessageValidation("Tous les champs doivent être remplis correctement");
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
      .login(data)
      .then((response) => {
        if (response) {
          userContext.login(
            response.data.token,
            response.data.userId,
            response.data.role
          );

          navigate("/", { replace: true });
        }
      })
      .catch((error) => {
        setMessageValidation(
          "La combinaison nom d'utilisateur et mot de passe ne correspond à aucun compte de Groupomania.fr"
        );
        console.log(error);
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
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
          <Form.Text className="text-danger ps-2">{message.email}</Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Group className="position-relative mb-3" controlId="password">
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
            value={dataUser.password}
          />
          <Form.Text className="text-danger ps-2">{message.password}</Form.Text>
        </FloatingLabel>
      </Form.Group>

      <Form.Text className="d-block rounded text-center p-2 fw-bold text-danger ">
        {messageValidation}
      </Form.Text>

      <FormLoginBtns login={"Se connecter"} signup={`S'inscrire`} />
    </Form>
  );
};

export default FormLogin;
