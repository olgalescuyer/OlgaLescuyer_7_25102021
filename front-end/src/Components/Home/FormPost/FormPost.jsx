import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Button from "react-bootstrap/Button";
import { BsPersonFill } from "react-icons/bs";

import userService from "../../../services/userService.js";
import validService from "../../../services/validService";

import UserContext from "../../../Context/UserContext";

const FormPost = ({ onValidate, firstName, lastName, avatar, onToggle }) => {
  const customMessage = validService.messages();
  const refImg = useRef();
  // console.log(refImg.current.value);
  const userContext = useContext(UserContext);
  const token = userContext.token;

  // ---- grab the object :
  const [dataPost, setDataPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });

  // --------------

  // for warning messages :

  const [oneErr, setOneErr] = useState(" ");
  const handleOneErr = (message) => {
    setOneErr(message);
  };

  const [message, setMessage] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });

  const handleMessage = (data) => {
    setMessage((prevMessage) => {
      return {
        ...prevMessage,
        title: data.title ? "" : customMessage.title,
        text: data.text ? "" : customMessage.text,
        imageUrl: data.imageUrl ? "" : customMessage.imageUrl,
      };
    });
  };

  // -------------- //
  const handleChange = (event) => {
    handleMessage(dataPost);
    handleOneErr(" ");

    // grab the post :
    setDataPost((prevDataPost) => {
      return {
        ...prevDataPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagefile = document.querySelector("#imageUrl");
    const message = JSON.stringify({
      title: dataPost.title,
      text: dataPost.text,
    });

    const formData = new FormData();
    formData.append("post", message);
    if (imagefile) {
      formData.append("image", imagefile.files[0]);
    }

    dataPost.title && dataPost.text
      ? submitToApi(formData, token)
      : dataPost.title && dataPost.imageUrl.length !== 0
      ? submitToApi(formData, token)
      : handleMessage(dataPost);

    if (!dataPost.title) {
      handleOneErr("Veuillez ajouter un titre");
    } else if (dataPost.title && !dataPost.text && !dataPost.imageUrl) {
      handleOneErr("Veuillez ajouter une description ou/et une image");
    }
  };

  // func call to api :
  const submitToApi = (data, auth) => {
    userService
      .postOnePost(data, auth)
      .then((response) => {
        onValidate();
        cancelCourse();
        onToggle();
        handleOneErr(" ");
      })
      .catch((error) => {
        console.log(error);
        handleOneErr("Trop longue- 255 caract??res max");
      });
  };

  // for 'annuler' the post :
  const cancelCourse = () => {
    setDataPost((prevDataPost) => {
      return {
        ...prevDataPost,
        title: "",
        text: "",
        imageUrl: "",
      };
    });
    refImg.current.value = "";
  };

  const handleClick = () => {
    cancelCourse();
    onToggle();
    handleOneErr(" ");
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

            <span className="ms-2 fw-bold">{firstName + " " + lastName}</span>

            <span className="position-absolute top-0 end-0 text-muted fst-italic">
              Cr??er une publication
            </span>
          </div>
        </Container>
      </header>

      <Form.Group
        className="position-relative text-muted fst-italic"
        controlId="title"
      >
        <FloatingLabel
          controlId="title"
          label="Titre est obligatoire (max 255)"
        >
          <Form.Control
            type="text"
            placeholder="title"
            name="title"
            value={dataPost.title}
            onChange={handleChange}
          />
        </FloatingLabel>

        <div className="position-relative p-4">
          <Form.Text className="position-absolute start-0 top-0 d-block ps-2 fw-bold text-secondary ">
            {message.title}
          </Form.Text>
        </div>
      </Form.Group>

      <Form.Group
        className=" position-relative text-muted fst-italic mt-1"
        controlId="text"
      >
        <FloatingLabel controlId="text" label="Text est optionnel (max 255)">
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
          <Form.Text className="position-absolute d-block ps-2 fw-bold text-secondary ">
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
          <Form.Text className="position-absolute d-block ps-2  fw-bold text-secondary fst-italic">
            {message.imageUrl}
          </Form.Text>
        </div>
      </Form.Group>

      <Form.Text className="d-block pt-4 px-2 fw-bold text-danger ">
        {oneErr}
      </Form.Text>

      <Container
        fluid
        className="d-flex justify-content-end position-relative g-0 mt-2 "
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
