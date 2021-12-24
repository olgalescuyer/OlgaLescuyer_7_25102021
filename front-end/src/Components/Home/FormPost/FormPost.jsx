import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import axios from "axios";
import { BsPersonFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Btns from "./Btns.jsx";

const FormPost = () => {
  const userId = localStorage.getItem("userId");
  const [dataPost, setDataPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
    userId: userId,
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
    // if(imageUrl.length !== 0)
    // const message = JSON.stringify({title: "", text:""})
    // data = new FormData()
    // data.append('image', imageUrl )
    // data.append('post', message)
    // else
    // data = {title: "", text: ""};

    if (dataPost.title) {
      // console.log(dataPost);
      submitToApi(dataPost);
    } else {
      console.log("title is empty");
    }
  };

  const submitToApi = (dataPost) => {
    const token = localStorage.getItem("user");
    const postData = JSON.stringify(dataPost);
    // console.log(postData);
    console.log(JSON.parse(token));
    const options = {
      method: "post",
      url: "http://localhost:3000/api/posts",

      headers: { Authorization: `Bearer ${JSON.parse(token)}` },

      data: postData,
    };
    console.log(options);

    axios(options)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const [dataUser, setDataUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("user");
    // const userId = localStorage.getItem("userId");

    let config = { headers: { Authorization: `Bearer ${JSON.parse(token)}` } };

    const url = "http://localhost:3000/api/auth/" + userId;
    // console.log(url);
    axios
      .get(url, config)
      .then((response) => {
        // console.log(response.data.u_first_name);
        let dataArr = response.data;
        // console.log(dataArr);
        setDataUser(dataArr);
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
