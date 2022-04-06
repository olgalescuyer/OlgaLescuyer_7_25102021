import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";

import Btns from "./Btns.jsx";

const FormProfile = ({ dataUser }) => {
  console.log(dataUser);
  const [dataNewUser, setDataNewUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  console.log(dataNewUser);

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
    // console.log(event.target.value)
    // event.preventDefault();
    setDataNewUser((prevDataNewUser) => {
      return {
        ...prevDataNewUser,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(dataNewUser);
  };

  return (
    <Form className="w-custom-limit-400" onSubmit={handleSubmit}>
      <Form.Group
        className="position-relative mb-3"
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
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="position-relative mb-3"
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
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group
        className="position-relative mb-3"
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
        <Form.Text className="text-muted ps-2 invisible">
          some warning...
        </Form.Text>
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

      <Btns />
    </Form>
  );
};

export default FormProfile;
