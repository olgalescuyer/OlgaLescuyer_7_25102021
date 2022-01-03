import React from "react";
import { Link } from "react-router-dom";
import { BsPersonFill } from "react-icons/bs";
import Container from "react-bootstrap/Container";

import ReactTimeAgo from "react-time-ago";

const HeaderPost = ({ firstName, lastName, createdAt }) => {
 
  return (
    <header>
      <Container fluid className="gx-0">
        <div className="position-relative d-flex align-items-center mb-3">
          <Link
            to="/profile/id"
            title="cliquez pour modifier avatar"
            className="d-block d-flex justify-content-center align-items-center rounded-circle custom-icon"
            style={{ background: "white", width: "60px", height: "60px" }}
          >
            <BsPersonFill size={36} />
          </Link>

          <span className="ps-3 fw-bold">{firstName + " " + lastName}</span>

          <span className="position-absolute top-0 end-0 text-muted fst-italic">
            publié <ReactTimeAgo date={createdAt} locale="fr-FR"/>
          </span>

        
        </div>
      </Container>
    </header>
  );
};

export default HeaderPost;
