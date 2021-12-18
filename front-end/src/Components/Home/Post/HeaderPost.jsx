import React from "react";
import { PersonFillIcon } from "@primer/octicons-react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HeaderPost = () => {
  return (
    <Container>
      <Row>
        <Col className="d-flex justify-content-center">
          <div
            className="w-100 d-flex justify-content-center"
            style={{ background: "white" }}
          >
            <PersonFillIcon size={24} verticalAlign="middle" />
          </div>
        </Col>
        <Col xs={5}>
          <p>User Name</p>
        </Col>
        <Col xs={5}>
          <p className="text-end">Create a post(v)</p>
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderPost;
