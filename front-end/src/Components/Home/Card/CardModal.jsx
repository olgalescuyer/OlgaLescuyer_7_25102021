import React, {
  useState,
  useContext,
  useEffect,
  useCallback,
  useMemo,
} from "react";

import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Image from "react-bootstrap/Image";

import UserContextTest from "../../../Context/UserContextTest";
import userService from "../../../services/userService.js";
import validService from "../../../services/validService";

import { RiDeleteBin6Line } from "react-icons/ri";
import { RiImageEditLine } from "react-icons/ri";
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

  const handleDeleteImg = () => {
    // e.preventDefault();
    // dataNewPost.imageUrl = null;

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
    // console.log("postObj", postObj);

    const formData = new FormData();
    if (imagefile) {
      formData.append("post", JSON.stringify(postObj));
      formData.append("image", imagefile.files[0]);
    } else {
      formData.append("post", JSON.stringify(postObj));
    }

    postObj.title && postObj.text
      ? submitToApi(postId, formData, token)
      : postObj.title && postObj.image
      ? submitToApi(postId, formData, token)
      : postObj.title && imagefile
      ? submitToApi(postId, formData, token)
      : handleMessage(postObj);

    // submitToApi(postId, formData, token);
  };

  // func to call the API :
  const submitToApi = (postId, data, token) => {
    userService
      .updatePost(postId, data, token)
      .then((response) => {
        // console.log(response);
        onValidate();
        validateHandler();
        onClose();
        setMessage("");
        handleInitialToggle();
      })
      .catch((error) => {
        console.log(error);
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
    setToggle((prevToggle) => ({
      ...prevToggle,
      [key]: value,
    }));
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
            setMessage("");
            handleInitialToggle();
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
                        {dataPost.p_image === dataNewPost.imageUrl &&
                        dataPost.p_image === 0
                          ? "Modifier l'"
                          : "Ajouter une "}
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

            <div className="d-flex justify-content-md-end justify-content-between mt-3">
              <Button
                variant="secondary"
                onClick={() => {
                  onClose();
                  setMessage("");

                  handleInitialToggle();
                }}
              >
                Annuler
              </Button>
              {!toggle.btnConfirm && (
                <Button
                  type="submit"
                  variant="primary"
                  className={
                    dataNewPost.imageUrl !== dataPost.p_image
                      ? "ms-3"
                      : "d-none"
                  }
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
