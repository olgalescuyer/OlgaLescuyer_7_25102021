import React from "react";
import { PersonFillIcon } from "@primer/octicons-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeaderPost = () => {
  return (
    <Container fluid>
      <Row className="align-items-center mb-3">
        <Col xs={2} className=" gx-0" >
          <div
            className="d-flex justify-content-center align-items-center rounded-circle"
            style={{ background: "white", width: "60px", height: "60px" }}
          >
            <PersonFillIcon size={24} />
          </div>
        </Col>
        <Col className="">
          <span className="fw-bold">User Name</span>
        </Col>
      
      </Row>
    </Container>
  );
};

export default HeaderPost;
