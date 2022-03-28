import React, { useState, useContext, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";

import UserContextTest from "../../../Context/UserContextTest";
import userService from "../../../services/userService.js";

import { RiDeleteBin6Line } from "react-icons/ri";
import { RiImageEditLine } from "react-icons/ri";
import { RiEditLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";

const CardModal = ({
  onClose,
  show,
  postId,
  onValidate,
  validateHandler,
  dataPost,
}) => {
  const userContext = useContext(UserContextTest);
  const token = userContext.token;

  // grabe a new post object :
  const [dataNewPost, setDataNewPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });
  // console.log(dataNewPost);

  const handleChange = (event) => {
    setShowBtn(true);
    setDataNewPost((prevDataNewPost) => {
      // console.log(prevDataNewPost);

      return {
        ...prevDataNewPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  // console.log(dataNewPost.title.length);

  // --------------------------

  const handleSubmit = (e) => {
    e.preventDefault();

    // make one object for send to API (dataPost &/ or dataNewPost) :
    let obj = {
      title: "",
      text: "",
      imageUrl: "",
    };

    const imagefile = document.querySelector("#imageUrl");

    dataNewPost.title
      ? (obj.title = dataNewPost.title)
      : (obj.title = dataPost.p_title);
    dataNewPost.text
      ? (obj.text = dataNewPost.text)
      : (obj.text = dataPost.p_text);
    !imagefile ? (obj.imageUrl = dataPost.p_image) : console.log(imagefile);

    // console.log(obj);

    // object for call to API :
    const postObj = JSON.stringify({
      title: obj.title,
      text: obj.text,
      image: obj.imageUrl,
    });

    // console.log(postObj);

    const formData = new FormData();

    if (imagefile) {
      formData.append("post", postObj);
      formData.append("image", imagefile.files[0]);
    } else {
      formData.append("post", postObj);
    }
    submitToApi(postId, formData, token);
  };

  // func to call the API :
  const submitToApi = (postId, data, token) => {
    userService
      .updatePost(postId, data, token)
      .then((response) => {
        onValidate();
        validateHandler();
        console.log(response);
        handleShowTitle(false);
        handleShowText(false);
        handleShowImg(false);
        handleShowBtn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // toggles :
  const [showTitle, setShowTitle] = useState(false);

  const handleShowTitle = (bool) => {
    setShowTitle(bool);
  };

  const [showText, setShowText] = useState(false);

  const handleShowText = (bool) => {
    setShowText(bool);
  };

  const [showImg, setShowImg] = useState(false);

  const handleShowImg = (bool) => {
    setShowImg(bool);
  };

  const [showBtn, setShowBtn] = useState(false);

  const handleShowBtn = (bool) => {
    setShowBtn(bool);
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header
          closeButton
          onClick={() => {
            onClose();
            handleShowTitle(false);
            handleShowText(false);
            handleShowImg(false);
            handleShowBtn(false);
          }}
        >
          <Modal.Title>
            Modifier l'article{dataPost.p_id}
            {dataPost.p_title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <div className="d-flex flex-column text-muted border rounded p-2">
              <span className=" text-muted fs-2">{dataPost.p_title}</span>

              <div className="d-flex justify-content-end">
                <Button
                  title="Modifier"
                  className="p-0 text-muted"
                  style={{
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                  onClick={(e) => handleShowTitle(true)}
                >
                  <RiEditLine size={24} className=""></RiEditLine>
                </Button>
              </div>
            </div>

            {showTitle && (
              <Form.Group
                className="mb-3 text-muted fst-italic"
                controlId="title"
                onChange={handleChange}
              >
                <div className="mb-3 text-muted"></div>
                <FloatingLabel
                  controlId="title"
                  label="Nouveau titre (max 255)"
                >
                  <Form.Control type="text" placeholder="title" name="title" />
                </FloatingLabel>

                <Form.Text className="text-muted ps-2 d-none">
                  some warning...
                </Form.Text>
              </Form.Group>
            )}

            {dataPost.p_text && (
              <div className=" d-flex flex-column border rounded p-2 mt-3">
                <div className="mb-3 text-muted">
                  <div>{dataPost.p_text}</div>
                </div>

                <div className="d-flex justify-content-end text-muted">
                  <Button
                    title="Supprimer"
                    className="p-0 ms-2"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                  >
                    <RiDeleteBin6Line
                      size={24}
                      className="text-muted"
                    ></RiDeleteBin6Line>
                  </Button>

                  <Button
                    title="Modifier"
                    className="p-0 ms-2"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={(e) => handleShowText(true)}
                  >
                    <RiEditLine size={24} className="text-muted"></RiEditLine>
                  </Button>
                </div>
              </div>
            )}
            {!dataPost.p_text && (
              <div className="d-flex justify-content-end border rounded mt-3 p-2">
                <span className="text-muted fst-italic">
                  Ajouter une description
                </span>

                <Button
                  title="Modifier"
                  className="p-0 ms-3"
                  style={{
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                  onClick={(e) => handleShowText(true)}
                >
                  <RiEditLine size={24} className="text-muted"></RiEditLine>
                </Button>
              </div>
            )}

            {showText && (
              <Form.Group
                className=" position-relative text-muted fst-italic mt-3"
                controlId="text"
                onChange={handleChange}
              >
                <FloatingLabel controlId="text" label="Nouveau text (max 255)">
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="text"
                    style={{ height: "100px" }}
                    name="text"
                  />
                </FloatingLabel>
                <Form.Text className="d-block position-absolute ps-2 bottom-0 end-0 fw-bold text-danger "></Form.Text>
              </Form.Group>
            )}

            {dataPost.p_image && (
              <>
                <div className="mt-3">
                  <Image
                    fluid
                    rounded
                    src={dataPost.p_image}
                    style={{ width: "100%" }}
                  />
                </div>

                <div
                  className={
                    dataPost.p_image
                      ? "d-flex justify-content-end mt-3"
                      : "mt-3"
                  }
                >
                  <Button
                    title="Modifier"
                    className="p-0"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={(e) => handleShowImg(true)}
                  >
                    <RiImageEditLine
                      size={24}
                      className="text-muted"
                    ></RiImageEditLine>
                  </Button>

                  <Button
                    title="Supprimer"
                    className="p-0 ms-2"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                  >
                    <RiDeleteBin6Line
                      size={24}
                      className="text-muted"
                    ></RiDeleteBin6Line>
                  </Button>
                </div>
              </>
            )}

            {!dataPost.p_image && (
              <div className="d-flex justify-content-end mt-3 pe-2">
                <div className="text-muted fst-italic text-center">
                  <span>Ajouter une image</span>
                </div>
                <Button
                  title="Ajouter une image"
                  className="p-0 ms-2"
                  style={{
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                  onClick={(e) => handleShowImg(true)}
                >
                  <RiImageAddLine
                    size={24}
                    className="text-muted"
                  ></RiImageAddLine>
                </Button>
              </div>
            )}

            {showImg && (
              <Form.Group
                controlId="imageUrl"
                className="mb-3"
                onChange={handleChange}
              >
                <Form.Label></Form.Label>
                <Form.Control
                  type="file"
                  name="imageUrl"
                  className="text-muted fst-italic"
                  accept="image/*"
                />
              </Form.Group>
            )}

            <div className="d-flex justify-content-md-end justify-content-between mt-3">
              <Button
                variant="secondary"
                onClick={() => {
                  onClose();
                  handleShowTitle(false);
                  handleShowText(false);
                  handleShowImg(false);
                  handleShowBtn(false);
                  setDataNewPost("");
                }}
              >
                Annuler
              </Button>
              {showBtn && (
                <Button
                  type="submit"
                  variant="primary"
                  className="ms-3"
                  onClick={() => {
                    onClose();
                  }}
                >
                  Confirmer les modifications
                </Button>
              )}
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CardModal;
