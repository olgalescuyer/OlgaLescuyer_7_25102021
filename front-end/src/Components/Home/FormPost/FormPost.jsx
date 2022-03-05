import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { BsPersonFill } from "react-icons/bs";
import Btns from "./FormPostBtns.jsx";
import userService from "../../../services/userService.js";

import UserContextTest from "../../../Context/UserContextTest";

const FormPost = ({ onValidate, firstName, lastName, avatar, toggle }) => {
  const refImg = useRef();
  // console.log(refImg.current.value);
  const userContext = useContext(UserContextTest);
  const token = userContext.token;

  const [dataPost, setDataPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
  // console.log(dataPost);

  const cancelCourse = () => {
    setDataPost({ title: "", text: "", imageUrl: "" });
    refImg.current.value = "";
  };

  const handleChange = (event) => {
    // console.log(event.target.value)
    setMessageValidation("");
    setDataPost((prevDataPost) => {
      // console.log(prevDataPost);
      return {
        ...prevDataPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  const [messageValidation, setMessageValidation] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagefile = document.querySelector("#imageUrl");

    if (dataPost.imageUrl.length !== 0 && dataPost.title) {
      const message = JSON.stringify({
        title: dataPost.title,
        text: dataPost.text,
      });

      const formData = new FormData();
      formData.append("post", message);
      formData.append("image", imagefile.files[0]);

      submitToApi(formData, token);
    } else if (dataPost.title && dataPost.text) {
      const titletext = JSON.stringify({
        title: dataPost.title,
        text: dataPost.text,
      });
      const mformData = new FormData();
      mformData.append("post", titletext);

      submitToApi(mformData, token);
    } else {
      setMessageValidation(
        "Votre publication doit contenir un titre et soit le text descriptif soit une image"
      );
    }
  };

  const submitToApi = (data, auth) => {
    userService
      .postOnePost(data, auth)
      .then((response) => {
        onValidate();
        cancelCourse();
        toggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form className="p-2 mb-2 color-custom-body" onSubmit={handleSubmit}>
      <header>
        <Container fluid className="gx-0">
          <div className="position-relative d-flex align-items-center mb-2">
            <Link
              to={`/profile/:id`}
              title="cliquez pour modifier avatar"
              className="d-block d-flex justify-content-center align-items-center rounded-circle custom-icon"
              style={{ background: "white", width: "60px", height: "60px" }}
            >
              {!avatar && <BsPersonFill size={36} />}
              {avatar && (
                <img
                  src={avatar}
                  alt="avatar"
                  className="img-fluid rounded-circle"
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    left: "0",
                    top: "0",
                  }}
                />
              )}
            </Link>

            <span className="ps-2 fw-bold">{firstName + " " + lastName}</span>

            <span className="position-absolute top-0 end-0 text-muted fst-italic">
              Créer une publication
            </span>
          </div>
        </Container>
      </header>

      <Form.Group className="mb-2 text-muted fst-italic" controlId="title">
        <FloatingLabel controlId="title" label="Titre (max 255)">
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={dataPost.title}
            onChange={handleChange}
          />
        </FloatingLabel>

        <Form.Text className="text-muted ps-2 d-none">
          some warning...
        </Form.Text>
      </Form.Group>

      <Form.Group
        className=" position-relative text-muted fst-italic"
        controlId="text"
      >
        <FloatingLabel controlId="text" label="À quoi pensez-vous ? (max 255)">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="text"
            style={{ height: "100px" }}
            name="text"
            onChange={handleChange}
            value={dataPost.text}
          />
        </FloatingLabel>
        <Form.Text className="d-block position-absolute ps-2 bottom-0 end-0 fw-bold text-danger ">
          {messageValidation}
        </Form.Text>
      </Form.Group>

      <Form.Group controlId="imageUrl" className="mb-2">
        <Form.Label></Form.Label>
        <Form.Control
          type="file"
          name="imageUrl"
          onChange={handleChange}
          className="text-muted fst-italic"
          accept="image/*"
          ref={refImg}
        />
      </Form.Group>
      <Container fluid className="d-flex position-relative g-0">
        <Btns onCancel={cancelCourse} toggle={toggle} />
      </Container>
    </Form>
  );
};

export default FormPost;
