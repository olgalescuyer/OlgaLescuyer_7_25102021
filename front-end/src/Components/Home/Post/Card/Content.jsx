import React from "react";
import Container from "react-bootstrap/Container";

const Content = () => {
  return (
    <Container fluid>
      <section>
        <h1>Title</h1>
        <p>Text</p>

        <div className="mb-3">
          <img src="" alt="" />
          Image is here
        </div>
      </section>
    </Container>
  );
};

export default Content;
