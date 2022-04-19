import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import UserContext from "../../../Context/UserContext";
import userService from "../../../services/userService";

import { BsPersonFill } from "react-icons/bs";

import Container from "react-bootstrap/Container";

import Likes from "./Likes";
import CardBtns from "./CardBtns";
import CardModal from "./CardModal";
import DeleteModal from "../../DeleteModal.jsx";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";

const Card = ({ dataPost, addData, onValidate }) => {
  timeago.register("fr", fr);
  const userContext = useContext(UserContext);
  const tokenAuth = userContext.authHeader();
  const config = { headers: tokenAuth };
  const id = parseInt(userContext.userId(), 10);

  //call to API for delete one post :
  const submitToApiDelete = (e, postId, config) => {
    userService
      .deleteOnePost(postId, config)
      .then((response) => onValidate())
      .catch((err) => console.log(err));
  };

  //toggle for show the CardModal :
  const [showCardModal, setShowCardModal] = useState(false);

  const handleCloseCardModal = () => setShowCardModal(false);
  const handleShowCardModal = () => setShowCardModal(true);

  // toggle for show alert "DeleteModal" :
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);

  return (
    <article>
      <Container fluid className="p-0 mb-2 color-custom-body">
        <header>
          <Container fluid className="p-2 g-0">
            <div className="position-relative d-flex align-items-center">
              <Link
                to={`/profile/:id`}
                title="Cliquez pour modifier votre profile"
                className="d-block d-flex justify-content-center align-items-center rounded-circle custom-icon"
                style={{
                  background: "white",
                  width: "60px",
                  height: "60px",
                }}
              >
                {!dataPost.u_avatar && <BsPersonFill size={36} />}
                {dataPost.u_avatar && (
                  <img
                    src={dataPost.u_avatar}
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
              <div className="position-relative">
                <span className="ms-2 fw-bold">
                  {dataPost.u_first_name + " " + dataPost.u_last_name}
                </span>

                <span
                  className={
                    dataPost.u_admin === 1
                      ? "ms-2 text-muted fst-italic d-block position-absolute"
                      : "d-none"
                  }
                >
                  admin
                </span>
              </div>

              <span className="position-absolute top-0 end-0 text-muted fst-italic">
                publiée <TimeAgo datetime={dataPost.p_time} locale="fr" />
              </span>
            </div>
          </Container>
        </header>
        <div>
          <div>
            <Container fluid className="p-2 g-0">
              <h1 className="fs-2" style={{ wordWrap: "break-word" }}>
                {dataPost.p_title}
              </h1>
              <p>{dataPost.p_text}</p>
            </Container>

            {dataPost.p_image && (
              <div
                className="position-relative overflow-hidden  "
                style={{
                  paddingBottom: "70%",
                }}
              >
                <img
                  src={dataPost.p_image}
                  alt={dataPost.p_image}
                  className="position-absolute img-fluid "
                  style={{
                    objectFit: "cover",
                    height: "100%",
                    width: "100%",
                    left: "0",
                    top: "0",
                  }}
                />
              </div>
            )}
          </div>
        </div>
        <Container fluid className="d-flex justify-content-between p-2 g-0">
          <Likes
            dataPost={dataPost}
            onValidate={onValidate}
            addData={addData}
          />
          <CardBtns
            dataPost={dataPost}
            onValidate={onValidate}
            handleShowCardModal={handleShowCardModal}
            handleShowDeleteModal={handleShowDeleteModal}
          />
        </Container>
      </Container>
      <CardModal
        onClose={handleCloseCardModal}
        show={showCardModal}
        onValidate={onValidate}
        dataPost={dataPost}
      />
      <DeleteModal
        handleClose={handleCloseDeleteModal}
        show={showDeleteModal}
        dataPost={dataPost}
        onValidate={onValidate}
      />
    </article>
  );
};

export default Card;
