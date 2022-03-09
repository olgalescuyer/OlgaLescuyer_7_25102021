import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { BsPersonFill } from "react-icons/bs";

import userService from "../../../services/userService.js";
import validService from "../../../services/validService";

import UserContextTest from "../../../Context/UserContextTest";

const FormPost = ({ onValidate, firstName, lastName, avatar, onToggle }) => {
  const customMessage = validService.messages();
  const refImg = useRef();
  // console.log(refImg.current.value);
  const userContext = useContext(UserContextTest);
  const token = userContext.token;

  // ---- grab the object :
  const [dataPost, setDataPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
  // console.log(dataPost);

  const handleChange = (event) => {
    setDataPost((prevDataPost) => {
      // console.log(prevDataPost);
      return {
        ...prevDataPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  // -------------- //

  // for warning messages :

  const [message, setMessage] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });

  const handleMessage = (data) => {
    console.log(data.title.length);
    data.title.length === 0
      ? setMessage({
          title: customMessage.title,
          text: customMessage.text,
          imageUrl: customMessage.imageUrl,
        })
      : setMessage("");
  };

  // -------------- //

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
      // console.log(dataPost);
      handleMessage(dataPost);
    }
  };

  // func to call the api :
  const submitToApi = (data, auth) => {
    userService
      .postOnePost(data, auth)
      .then((response) => {
        onValidate();
        cancelCourse();
        onToggle();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // for 'annuler' the post :
  const cancelCourse = () => {
    setDataPost({ title: "", text: "", imageUrl: "" });
    refImg.current.value = "";
  };
  const handleClick = () => {
    cancelCourse();
    onToggle();
  };

  return (
    <Form
      className="p-2 color-custom-body"
      style={{ height: "100vh" }}
      onSubmit={handleSubmit}
    >
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

      <Form.Group
        className="position-relativetext-muted fst-italic"
        controlId="title"
      >
        <FloatingLabel controlId="title" label="Titre (max 255)">
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={dataPost.title}
            onChange={handleChange}
          />
        </FloatingLabel>

        <div className="position-relative p-4">
          <Form.Text className="position-absolute d-block ps-2 bottom-0 end-0 fw-bold text-danger ">
            {message.title}
          </Form.Text>
        </div>
      </Form.Group>

      <Form.Group
        className=" position-relative text-muted fst-italic mt-1"
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
        <div className="position-relative p-1">
          <Form.Text className="position-absolute d-block ps-2 fw-bold text-danger ">
            {message.text}
          </Form.Text>
        </div>
      </Form.Group>

      <Form.Group controlId="imageUrl" className="position-relative mb-2 mt-1">
        <Form.Label></Form.Label>
        <Form.Control
          type="file"
          name="imageUrl"
          onChange={handleChange}
          className="text-muted fst-italic"
          accept="image/*"
          ref={refImg}
        />
        <div className="position-relative">
          <Form.Text className="position-absolute d-block ps-2  fw-bold text-danger fst-italic">
            {message.imageUrl}
          </Form.Text>
        </div>
      </Form.Group>
      <Container
        fluid
        className="d-flex justify-content-end position-relative g-0 "
      >
        <Button variant="primary" type="submit">
          Publier
        </Button>
        <Button
          variant="outline-secondary"
          className="ms-3"
          onClick={() => handleClick()}
        >
          Annuler
        </Button>
      </Container>
    </Form>
  );
};

export default FormPost;
