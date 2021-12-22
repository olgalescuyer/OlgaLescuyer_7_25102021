import React, { useState} from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";

import HeaderPost from "../Post/HeaderPost";
import Btns from "./Btns.jsx";

const FormPost = () => {
 
  const [dataPost, setDataPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
  // console.log(dataPost);

  const handleChange = (event) => {
    // console.log(event.target.value)

    setDataPost((prevDataPost) => {
      console.log(prevDataPost);
      return {
        ...prevDataPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (dataPost.title) {
      console.log(dataPost);
      submitToApi(dataPost);
    } else {
      console.log("title is empty");
    }
  };

  const submitToApi = (data) => {
    axios
      .post("http://localhost:3000/api/posts", data)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Form
      className="rounded p-3 mb-2 color-custom-body"
      onSubmit={handleSubmit}
    >
      <HeaderPost />
      <Form.Group className="mb-3 text-muted fst-italic" controlId="title">
        <FloatingLabel controlId="title" label="Titre">
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
        <FloatingLabel controlId="text" label="What's on your mind ?">
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
        />
      </Form.Group>

      <Btns />
    </Form>
  );
};

export default FormPost;
