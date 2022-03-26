import React from "react";
import { Link } from "react-router-dom";

import { BsPersonFill } from "react-icons/bs";

import Container from "react-bootstrap/Container";
import Likes from "./Likes";
import Btns from "./CardBtns";

import TimeAgo from "timeago-react";
import * as timeago from "timeago.js";
import fr from "timeago.js/lib/lang/fr";

const Card = ({
  postId,
  title,
  text,
  imageUrl,
  userId,
  firstName,
  lastName,
  avatar,
  createdAt,
  onValidate,
  liked,
  disliked,
  userChoice,
  likeId,
  likeUserId,
}) => {
  timeago.register("fr", fr);

  return (
    <article>
      <Container fluid className="p-0 mb-2 color-custom-body">
        <header>
          <Container fluid className="p-2 g-0">
            <div className="position-relative d-flex align-items-center">
              <Link
                to={`/profile/:id`}
                title="cliquez pour modifier avatar"
                className="d-block d-flex justify-content-center align-items-center rounded-circle custom-icon"
                style={{
                  background: "white",
                  width: "60px",
                  height: "60px",
                }}
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
                publiée <TimeAgo datetime={createdAt} locale="fr" />
              </span>
            </div>
          </Container>
        </header>
        <div>
          <div>
            <Container fluid className="p-2 g-0">
              <h1 className="fs-2">{title}</h1>
              <p>{text}</p>
            </Container>

            {imageUrl && (
              <div
                className="position-relative overflow-hidden  "
                style={{
                  paddingBottom: "100%",
                }}
              >
                <img
                  src={imageUrl}
                  alt={imageUrl}
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
            liked={liked}
            disliked={disliked}
            postId={postId}
            userChoice={userChoice}
            userId={userId}
            likeId={likeId}
            likeUserId={likeUserId}
            onValidate={onValidate}
          />
          <Btns userId={userId} postId={postId} onValidate={onValidate} />
        </Container>
      </Container>
    </article>
  );
};

export default Card;
