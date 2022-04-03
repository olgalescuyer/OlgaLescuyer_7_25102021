import React, { useState, useContext, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import BtnImgDel from "../../UI/BtnImgDel.jsx";
import BtnImgEdit from "../../UI/BtnImgEdit.jsx";

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

  // toggles :
  const [toggle, setToggle] = useState({
    image: false,
    btnConfirm: false,
    btnDelete: false,
    inputImg: false,
  });

  const handleToggle = (key, value) => {
    // console.log(key, value);
    setToggle((prevToggle) => ({
      ...prevToggle,
      [key]: value,
    }));
  };

  // grabe a new post object + initial value from db by dependency dataPost :
  const [dataNewPost, setDataNewPost] = useState({
    title: "",
    text: "",
    imageUrl: "",
  });

  const handleValue = () => {
    setDataNewPost((prevDataNewPost) => {
      return {
        ...prevDataNewPost,

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
    handleToggle("btnConfirm", true);

    // for cancel warning messages :
    setMessage("");

    // grabe a values :
    setDataNewPost((prevDataNewPost) => {
      return {
        ...prevDataNewPost,
        [event.target.name]: event.target.value,
      };
    });
  };

  // console.log(dataNewPost);

  // --------------------------

  // for warning messages :

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
        imageUrl: data.image ? "" : customMessage.imageUrl,
      };
    });
  };

  // -------------- //

  // delete image :

  const handleDeleteImg = (bool) => {
    // e.preventDefault();
    // dataNewPost.imageUrl = null;
    console.log("from");

    setDataNewPost((prevDataNewPost) => {
      return {
        ...prevDataNewPost,
        imageUrl: null,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const imagefile = document.querySelector("#imageUrl");

    // object for FormData & call to API :
    const postObj = {
      title: dataNewPost.title,
      text: dataNewPost.text,
      image:
        dataNewPost.imageUrl === null ? dataPost.p_image : dataNewPost.imageUrl,
    };
    console.log("postObj", postObj);

    const formData = new FormData();
    if (imagefile) {
      formData.append("post", JSON.stringify(postObj));
      formData.append("image", imagefile.files[0]);
    } else {
      formData.append("post", JSON.stringify(postObj));
    }

    console.log("postObj", JSON.stringify(postObj));
    console.log(imagefile);

    postObj.title && postObj.text
      ? console.log(" postObj.title && postObj.text")
      : postObj.title && postObj.image
      ? console.log(" postObj.title && postObj.image")
      : postObj.title && imagefile
      ? console.log(" postObj.title && imagefile")
      : handleMessage(postObj);

    // submitToApi(postId, formData, token);
  };

  // func to call the API :
  const submitToApi = (postId, data, token) => {
    console.log("from submit to api");
    userService
      .updatePost(postId, data, token)
      .then((response) => {
        onValidate();
        validateHandler();
        console.log(response);
        onClose();
        setMessage("");
        setToggle(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header
          closeButton
          onClick={() => {
            onClose();
            setMessage("");
            setToggle(false);
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

            {dataNewPost.imageUrl && (
              <>
                {!toggle.image && (
                  <div className="mt-3">
                    <Image
                      fluid
                      rounded
                      src={dataPost.p_image}
                      alt={dataPost.p_image}
                      style={{ width: "100%" }}
                    />
                  </div>
                )}

                <div
                  className={
                    dataPost.p_image
                      ? "d-flex justify-content-end mt-3"
                      : "mt-3"
                  }
                >
                  {/* <div className="text-muted fst-italic text-center">
                    <span>Modifier l'image</span>
                  </div> */}

                  {!toggle.btnEdit && (
                    <Button
                      title="Modifier"
                      className={
                        dataNewPost.imageUrl !== dataPost.p_image
                          ? "d-none"
                          : "p-0"
                      }
                      style={{
                        background: "transparent",
                        borderColor: "transparent",
                      }}
                      onClick={(e) => {
                        handleToggle("inputImg", true);
                        handleToggle("image", true);
                        handleToggle("btnEdit", true);
                        // handleDeleteImg(false);
                      }}
                    >
                      <RiImageEditLine
                        size={24}
                        className="text-muted"
                      ></RiImageEditLine>
                    </Button>
                  )}

                  <Button
                    title="Supprimer"
                    className="p-0 ms-2"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      handleDeleteImg(false);
                      handleToggle("inputImg", false);
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

            {!dataNewPost.imageUrl && (
              <div className="position-relative d-flex justify-content-end mt-3">
                <div
                  className={
                    dataNewPost.imageUrl
                      ? "d-none"
                      : "text-muted fst-italic text-center"
                  }
                >
                  <span>Ajouter une image</span>
                </div>
                <Button
                  title="Ajouter une image"
                  className={dataNewPost.imageUrl ? "d-none" : "p-0 ms-2"}
                  style={{
                    background: "transparent",
                    borderColor: "transparent",
                  }}
                  onClick={(e) => handleToggle("inputImg", true)}
                >
                  <RiImageAddLine
                    size={24}
                    className="text-muted"
                  ></RiImageAddLine>
                </Button>
               {dataNewPost.imageUrl && ( 
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
                )} 
                <Form.Text
                  className="position-absolute top-0 start-0 d-block ps-2  fw-bold text-danger fst-italic"
                  style={{ zIndex: "4" }}
                >
                  {message.imageUrl}
                </Form.Text>
              </div>
            )}

            {toggle.inputImg && (
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
                  setMessage("");
                  setToggle(false);
                  setDataNewPost("");
                }}
              >
                Annuler
              </Button>
              {toggle.btnConfirm && (
                <Button type="submit" variant="primary" className="ms-3">
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
