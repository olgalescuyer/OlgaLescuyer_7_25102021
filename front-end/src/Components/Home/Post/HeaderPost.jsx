import React from "react";
import { PersonFillIcon } from "@primer/octicons-react";
import Container from "react-bootstrap/Container";

const HeaderPost = () => {
  return (
    <Container fluid className="gx-0">
      <div className="position-relative d-flex align-items-center mb-3">
        <div
          className="d-flex justify-content-center align-items-center rounded-circle"
          style={{ background: "white", width: "60px", height: "60px" }}
        >
          <PersonFillIcon size={24} />
        </div>

        <span className="ps-3 fw-bold">User Name</span>

        <span className="position-absolute top-0 end-0 text-muted fst-italic">
          Create a post - time(var)
        </span>
      </div>
    </Container>
  );
};

export default HeaderPost;
