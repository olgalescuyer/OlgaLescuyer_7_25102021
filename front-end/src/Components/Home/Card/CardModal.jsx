import React, { useState, useContext, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import UserContextTest from "../../../Context/UserContextTest";
import userService from "../../../services/userService.js";
import validService from "../../../services/validService";

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
  const customMessage = validService.messages();

  // grabe a new post object + initial value from db by dependency dataPost :
  const [dataNewPost, setDataNewPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });

  const handleValue = () => {
    setDataNewPost(() => {
      return {
        title: dataPost.p_title,
        text: dataPost.p_text,
        imageUrl: dataPost.p_image,
      };
    });
  };

  useEffect(() => {
    handleValue();
  }, [dataPost]);

  const handleChange = (event) => {
    // add a btn "confirmer" :
    setShowBtn(true);

    // grabe a values :
    setDataNewPost((prevDataNewPost) => {
      // console.log(prevDataNewPost);

      return {
        ...prevDataNewPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  // --------------------------

  // for warning messages :

  const [message, setMessage] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });

  const handleMessage = (data) => {
    return !data.title && !data.text && !data.imageUrl
      ? setMessage({
          title: customMessage.title,
          text: customMessage.text,
          imageUrl: customMessage.imageUrl,
        })
      : !data.text && !data.imageUrl
      ? setMessage({
          text: customMessage.text,
          imageUrl: customMessage.imageUrl,
        })
      : !data.title
      ? setMessage({
          title: customMessage.title,
        })
      : console.log("error");
  };

  // dataNewPost.title ? console.log(dataNewPost.title.length) : console.log("not")
  // -------------- //

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagefile = document.querySelector("#imageUrl");

    // object for FormData & call to API :
    const postObj = JSON.stringify({
      title: dataNewPost.title,
      text: dataNewPost.text,
      image: !imagefile ? dataPost.p_image : console.log(""),
    });

    const formData = new FormData();
    if (imagefile) {
      console.log("from true");
      formData.append("post", postObj);
      formData.append("image", imagefile.files[0]);
    } else {
      console.log("from false");
      formData.append("post", postObj);
    }

    console.log(postObj);

    if (dataNewPost.title && dataNewPost.imageUrl) {
      // submitToApi(postId, formData, token);
      // onClose();
    } else if (dataNewPost.title && dataNewPost.text) {
      // submitToApi(postId, formData, token);
      // onClose();
    } else if (
      (dataNewPost.title && dataNewPost.text && dataNewPost.imageUrl) ||
      imagefile
    ) {
      // submitToApi(postId, formData, token);
    } else {
      console.log(dataNewPost);
      handleMessage(dataNewPost);
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
onclose();
        handleShowImg(false);
        handleShowBtn(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // toggles :

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

            handleShowImg(false);
            handleShowBtn(false);
          }}
        >
          <Modal.Title>Modifier la publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group
              className="position-relative mb-3 text-muted fst-italic"
              controlId="title"
            >
              <Form.Control
                as="textarea"
                rows={3}
                style={{ height: "100px" }}
                type="text"
                placeholder="Modifier le titre"
                name="title"
                onChange={handleChange}
                value={dataNewPost.title}
                className="fs-2"
              />

              <Form.Text
                className="d-block position-absolute ps-2 bottom-0 end-0 fw-bold text-danger"
                muted
              >
                {message.title}
              </Form.Text>
            </Form.Group>

            <Form.Group
              className=" position-relative text-muted fst-italic mt-3"
              controlId="text"
            >
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ajouter une description"
                style={{ height: "100px" }}
                name="text"
                onChange={handleChange}
                value={dataNewPost.text}
              />

              <Form.Text className="d-block position-absolute ps-2 bottom-0 end-0 fw-bold text-danger ">
                {message.text}
              </Form.Text>
            </Form.Group>

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
              <div className="position-relative d-flex justify-content-end mt-3 pe-2">
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
                <Form.Text
                  className="position-absolute d-block ps-2  fw-bold text-danger fst-italic"
                  style={{ zIndex: "4" }}
                >
                  {message.imageUrl}
                </Form.Text>
              </div>
            )}

            {showImg && (
              <Form.Group
                controlId="imageUrl"
                className="mb-3"
                onChange={handleChange}
              >
                <Form.Control
                  type="file"
                  name="imageUrl"
                  className="text-muted fst-italic"
                  accept="image/*"
                />
                <div className="position-relative"></div>
              </Form.Group>
            )}

            <div className="d-flex justify-content-md-end justify-content-between mt-3">
              <Button
                variant="secondary"
                onClick={() => {
                  onClose();

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
