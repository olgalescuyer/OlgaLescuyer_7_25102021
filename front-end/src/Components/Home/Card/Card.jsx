import React, { useState } from "react";
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
  createdAt,
  onValidate,
}) => {
  timeago.register("fr", fr);

  return (
    <article>
      <Container fluid className="p-0 mb-2 color-custom-body">
        <header>
          <Container fluid className="pt-2">
            <div className="position-relative d-flex align-items-center mb-3">
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
                <BsPersonFill size={36} />
              </Link>

              <span className="ps-3 fw-bold">{firstName + " " + lastName}</span>

              <span className="position-absolute top-0 end-0 text-muted fst-italic">
                publiée <TimeAgo datetime={createdAt} locale="fr" />
              </span>
            </div>
          </Container>
        </header>
        <div>
          <div>
            <Container fluid className="">
              <h1 className="fs-2">{title}</h1>
              <p>{text}</p>
            </Container>

            {imageUrl && (
              <div
                className="position-relative overflow-hidden mb-3 "
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
                  // sizes="614px"
                />
              </div>
            )}
          </div>
        </div>
        <Container fluid className="d-flex justify-content-between gx-0">
          <Likes />
          <Btns userId={userId} postId={postId} onValidate={onValidate} />
        </Container>
      </Container>
    </article>
  );
};

export default Card;
