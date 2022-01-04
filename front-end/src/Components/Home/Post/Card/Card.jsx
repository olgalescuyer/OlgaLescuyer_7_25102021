import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../../../Context/UserContext";

import { BsPersonFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Icons from "./Icons";

import ReactTimeAgo from "react-time-ago";

const Card = ({
  title,
  text,
  imageUrl,
  userId,
  firstName,
  lastName,
  createdAt,
}) => {
  const { id, role } = useContext(UserContext);

  if (userId === id) {
    return (
      <Container fluid className="rounded p-3 mb-2 color-custom-body">
        <header>
          <Container fluid className="gx-0">
            <div className="position-relative d-flex align-items-center mb-3">
              <Link
                to={`/profile/${userId}`}
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
                publiée <ReactTimeAgo date={createdAt} locale="fr-FR" />
              </span>
            </div>
          </Container>
        </header>
        <Container fluid>
          <div>
            <h1 className="fs-2">{title}</h1>
            <p>{text}</p>

            <div
              className="mb-3"
              style={{
                maxWidth: "300px",
                height: "200px",
                overflow: "hidden",
                objectFit: "cover",
              }}
            >
              <img
                src={imageUrl}
                alt={imageUrl}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </Container>
        <Container fluid className="d-flex justify-content-between gx-0">
          <Icons />
          <div>
            <Button variant="primary" className="">
              Modifier
            </Button>
            <Button variant="outline-secondary" type="submit" className="ms-3">
              Supprimer
            </Button>
          </div>
        </Container>
      </Container>
    );
  } else if (role === "admin") {
    return (
      <Container fluid className="rounded p-3 mb-2 color-custom-body">
        <header>
          <Container fluid className="gx-0">
            <div className="position-relative d-flex align-items-center mb-3">
              <Link
                to={`/profile/${userId}`}
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
                publiée <ReactTimeAgo date={createdAt} locale="fr-FR" />
              </span>
            </div>
          </Container>
        </header>
        <Container fluid>
          <div>
            <h1 className="fs-2">{title}</h1>
            <p>{text}</p>

            <div
              className="mb-3"
              style={{
                maxWidth: "300px",
                height: "200px",
                overflow: "hidden",
                objectFit: "cover",
              }}
            >
              <img
                src={imageUrl}
                alt={imageUrl}
                className="img-fluid rounded"
              />
            </div>
          </div>
        </Container>
        <Container fluid className="d-flex justify-content-between gx-0">
          <Icons />
          <div>
            
            <Button variant="outline-secondary" type="submit" className="ms-3">
              Supprimer
            </Button>
          </div>
        </Container>
      </Container>
    );
  }

  return (
    <Container fluid className="rounded p-3 mb-2 color-custom-body">
      <header>
        <Container fluid className="gx-0">
          <div className="position-relative d-flex align-items-center mb-3">
            <Link
              to={`/profile/${userId}`}
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
              publiée <ReactTimeAgo date={createdAt} locale="fr-FR" />
            </span>
          </div>
        </Container>
      </header>
      <Container fluid>
        <div>
          <h1 className="fs-2">{title}</h1>
          <p>{text}</p>

          <div
            className="mb-3"
            style={{
              maxWidth: "300px",
              height: "200px",
              overflow: "hidden",
              objectFit: "cover",
            }}
          >
            <img src={imageUrl} alt={imageUrl} className="img-fluid rounded" />
          </div>
        </div>
      </Container>
      <Container fluid className="d-flex justify-content-between gx-0">
        <Icons />
      </Container>
    </Container>
  );
};

export default Card;
