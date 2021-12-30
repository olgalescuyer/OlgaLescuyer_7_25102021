import React, { useState, useEffect, useContext } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { BsPersonFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Btns from "./Btns.jsx";
import userService from "../../../services/userService.js";
import { UserContext } from "../../../Context/UserContext";

const FormPost = ({ onValidate }) => {
  const { authHeader } = useContext(UserContext);
  const config = { headers: authHeader() };

  const userId = localStorage.getItem("userId");

  const [dataPost, setDataPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
  // console.log(dataPost);

  const handleChange = (event) => {
    // console.log(event.target.value)

    setDataPost((prevDataPost) => {
      // console.log(prevDataPost);
      return {
        ...prevDataPost,
        [event.target.name]: event.target.value,
      };
    });
  };

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

      submitToApi(formData);
    } else if (dataPost.title) {
      const titletext = JSON.stringify({
        title: dataPost.title,
        text: dataPost.text,
      });
      const mformData = new FormData();
      mformData.append("post", titletext);

      submitToApi(mformData);
    } else {
      console.log("title is empty");
    }
  };

  const submitToApi = (data) => {
    userService
      .postOnePost(data, config)
      .then((response) => {
        onValidate();
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    userService
      .getOneUser(userId, config)
      .then((response) => {
        setDataUser(response.data);
      })

      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Form
      className="rounded p-3 mb-2 color-custom-body"
      onSubmit={handleSubmit}
    >
      <header>
        <Container fluid className="gx-0">
          <div className="position-relative d-flex align-items-center mb-3">
            <a
              href="/profile/id"
              title="cliquez pour modifier avatar"
              className="d-block d-flex justify-content-center align-items-center rounded-circle custom-icon"
              style={{ background: "white", width: "60px", height: "60px" }}
            >
              <BsPersonFill size={36} />
            </a>

            <span className="ps-3 fw-bold">
              {dataUser.u_first_name + " " + dataUser.u_last_name}
            </span>

            <span className="position-absolute top-0 end-0 text-muted fst-italic">
              Create a post
            </span>
          </div>
        </Container>
      </header>

      <Form.Group className="mb-3 text-muted fst-italic" controlId="title">
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

      <Form.Group className="text-muted fst-italic" controlId="text">
        <FloatingLabel controlId="text" label="What's on your mind ? (max 255)">
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
      </Form.Group>

      <Form.Group controlId="imageUrl" className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control
          type="file"
          name="imageUrl"
          onChange={handleChange}
          className="text-muted fst-italic"
          accept="image/*"
        />
      </Form.Group>

      <Btns />
    </Form>
  );
};

export default FormPost;
