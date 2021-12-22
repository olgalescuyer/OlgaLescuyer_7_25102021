import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Content = ({ title, text, imageUrl }) => {
  return (
    <Container fluid>
      <section>
        <h1 className="fs-2">{title}</h1>
        <p>{text}</p>

        <div className="mb-3">
          <img src={imageUrl} alt={imageUrl} />
         
        </div>
      </section>
    </Container>
  );
};

export default Content;
