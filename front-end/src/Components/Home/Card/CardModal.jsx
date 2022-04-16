import React, { useState, useContext, useEffect } from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import UserContext from "../../../Context/UserContext";
import userService from "../../../services/userService.js";

import { RiDeleteBin6Line } from "react-icons/ri";
import { RiImageEditLine } from "react-icons/ri";
import { RiImageAddLine } from "react-icons/ri";

const CardModal = ({ onClose, show, dataPost, onValidate }) => {
  const userContext = useContext(UserContext);
  const token = userContext.token;

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
    handleToggle("btnConfirm", false);
    // console.log("dataNewPost", dataNewPost);

    // grabe a values :
    setDataNewPost((prevDataNewPost) => {
      return {
        ...prevDataNewPost,
        [event.target.name]: event.target.value,
      };
    });
    handleOneErr(" ");
  };

  // console.log(dataNewPost);

  // for warning messages :
  const [oneErr, setOneErr] = useState(" ");
  const handleOneErr = (message) => {
    setOneErr(message);
  };

  // -------------- //

  // delete image :

  const handleDeleteImg = () => {
    // e.preventDefault();

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
      image: dataNewPost.imageUrl,
    };

    const formData = new FormData();
    if (imagefile) {
      formData.append("post", JSON.stringify(postObj));
      formData.append("image", imagefile.files[0]);
    } else {
      formData.append("post", JSON.stringify(postObj));
    }

    const createErrMessage = () => {
      if (!postObj.title) {
        handleOneErr("Veuillez ajouter un titre");
      } else if (postObj.title && !postObj.text && !postObj.image) {
        handleOneErr("Veuillez ajouter une description et/ou une image");
      }
    };

    postObj.title && postObj.text
      ? submitToApi(dataPost.p_id, formData, token)
      : postObj.title && postObj.image
      ? submitToApi(dataPost.p_id, formData, token)
      : createErrMessage();
  };

  // func to call the API :
  const submitToApi = (postId, data, token) => {
    userService
      .updatePost(postId, data, token)
      .then((response) => {
        // console.log(response);
        onValidate();
        onClose();
        handleInitialToggle();
        handleOneErr(" ");
      })
      .catch((error) => {
        console.log(error);
        handleOneErr("Trop longue- 255 caractères max");
      });
  };

  // toggles :
  const [toggle, setToggle] = useState({
    image: true,
    textEdit: true,
    btnEdit: true,
    btnDelete: true,
    inputImg: true,
    btnConfirm: true,
  });

  const handleToggle = (key, value) => {
    // console.log(key, value);
    setToggle((prevToggle) => {
      return {
        ...prevToggle,
        [key]: value,
      };
    });
  };

  const handleInitialToggle = () => {
    setToggle((prevToggle) => ({
      ...prevToggle,
      image: true,
      textEdit: true,
      btnEdit: true,
      btnDelete: true,
      inputImg: true,
      btnConfirm: true,
    }));
  };

  return (
    <>
      <Modal show={show} onHide={onClose}>
        <Modal.Header
          closeButton
          onClick={() => {
            onClose();
            handleInitialToggle();
            handleOneErr(" ");
          }}
        >
          <Modal.Title>Modifier la publication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="position-relative mb-3" controlId="title">
              <Form.Control
                as="textarea"
                rows={3}
                style={{ height: "100px" }}
                type="text"
                placeholder="Ajouter un titre ( obligatoire )"
                name="title"
                onChange={handleChange}
                value={dataNewPost.title}
                className="fs-4"
              />
            </Form.Group>

            <Form.Group className=" position-relative mt-3" controlId="text">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Ajouter une description ( optionnel )"
                style={{ height: "100px" }}
                name="text"
                onChange={handleChange}
                value={dataNewPost.text}
              />
            </Form.Group>

            <>
              {dataNewPost.imageUrl === dataPost.p_image && (
                <div className={dataNewPost.imageUrl ? "mt-3" : "d-none"}>
                  <Image
                    fluid
                    rounded
                    src={dataPost.p_image}
                    alt={dataPost.p_image}
                    style={{ width: "100%" }}
                  />
                </div>
              )}

              <div className="d-flex justify-content-end mt-3">
                <>
                  {toggle.textEdit && (
                    <div className="text-muted fst-italic text-center me-2">
                      <span>
                        {dataNewPost.imageUrl ? "Modifier l'" : "Ajouter une "}
                        image
                      </span>
                    </div>
                  )}

                  {toggle.btnEdit && (
                    <>
                      <Button
                        title="Modifier"
                        className={dataNewPost.imageUrl ? "p-0" : "d-none"}
                        style={{
                          background: "transparent",
                          borderColor: "transparent",
                        }}
                        onClick={(e) => {
                          handleToggle("inputImg", false);
                          handleToggle("textEdit", false);
                          handleToggle("btnEdit", false);

                          handleToggle("btnDelete", false);
                        }}
                      >
                        <RiImageEditLine
                          size={24}
                          className="text-muted"
                        ></RiImageEditLine>
                      </Button>

                      <Button
                        title="Ajouter une image"
                        className={!dataNewPost.imageUrl ? "p-0" : "d-none"}
                        style={{
                          background: "transparent",
                          borderColor: "transparent",
                        }}
                        onClick={(e) => {
                          handleToggle("inputImg", false);
                          handleToggle("textEdit", false);
                          handleToggle("btnEdit", false);

                          handleToggle("btnDelete", false);
                        }}
                      >
                        <RiImageAddLine
                          size={24}
                          className="text-muted"
                        ></RiImageAddLine>
                      </Button>
                    </>
                  )}
                </>

                {!toggle.btnDelete && (
                  <Button
                    title="Supprimer"
                    className="p-0 ms-2"
                    style={{
                      background: "transparent",
                      borderColor: "transparent",
                    }}
                    onClick={() => {
                      handleToggle("btnConfirm", false);

                      handleDeleteImg();
                      handleToggle("textEdit", true);
                      handleToggle("btnEdit", true);
                      handleToggle("inputImg", true);
                      handleToggle("btnDelete", true);
                    }}
                  >
                    <RiDeleteBin6Line
                      size={24}
                      className="text-muted"
                    ></RiDeleteBin6Line>
                  </Button>
                )}
              </div>
            </>

            {!toggle.inputImg && (
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

            <Form.Text className="d-block text-end fw-bold text-danger">
              {oneErr}
            </Form.Text>

            <div className="d-flex justify-content-md-end justify-content-between mt-3">
              <Button
                variant="secondary"
                onClick={() => {
                  onClose();
                  handleInitialToggle();
                  handleOneErr(" ");
                }}
              >
                Annuler
              </Button>
              {!toggle.btnConfirm && (
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
