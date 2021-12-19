import React from "react";
import Button from "react-bootstrap/Button";

const Btns = () => {
  return (
    <>
      <Button variant="primary" className="">
        Publier
      </Button>
      <Button variant="outline-secondary" type="submit" className="ms-3">
        Annuler
      </Button>
    </>
  );
};

export default Btns;
