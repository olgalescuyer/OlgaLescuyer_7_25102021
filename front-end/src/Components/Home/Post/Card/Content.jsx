import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Content = ({ title, text }) => {
  return (
    <Container fluid>
      <section>
        <h1 className="fs-2">{title}</h1>
        <p>{text}</p>

        <div className="mb-3">
          <img src="" alt="" />
          Image is here
        </div>
      </section>
    </Container>
  );
};

export default Content;
