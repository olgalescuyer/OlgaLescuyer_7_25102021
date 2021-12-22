import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import axios from "axios";

const Content = ({ title, text, imageUrl}) => {
  return (
    <Container fluid>
      <article>
        <h1 className="fs-2">{title}</h1>
        <p>{text}</p>

        <div className="mb-3" style={{width: '300px', height: '200px', overflow: 'hidden', objectFit: 'cover'}}>
          <img src={imageUrl} alt={imageUrl} className="img-fluid rounded" />
         
        </div>
      </article>
    </Container>
  );
};

export default Content;
