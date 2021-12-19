import React from "react";
import Container from "react-bootstrap/Container";

import HeaderPost from "../HeaderPost";
import Content from "./Content";
import Icons from "./Icons";
import Btns from "./Btns";

const Card = () => {
  return (
    <Container fluid className="rounded p-3 mb-2 color-custom-body">
      <HeaderPost />
      <Content />
      <Container fluid className="d-flex justify-content-between gx-0">
        <Btns />
        <Icons />
      </Container>
    </Container>
  );
};

export default Card;
