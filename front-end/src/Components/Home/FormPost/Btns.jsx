import React from "react";
import Button from "react-bootstrap/Button";
// import FormPost from './FormPost';

const Btns = () => {
  return (
    <>
      <Button variant="primary">Publier</Button>
      <Button variant="outline-secondary" type="submit" className="ms-3">
        Annuler
      </Button>
    </>
  );
};

export default Btns;
