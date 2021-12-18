import React from "react";
import Button from "react-bootstrap/Button";

const Btns = () => {
  return (
    <>
      <Button variant="secondary" type="submit" className=" ">
        Annuler
      </Button>

      <Button variant="primary" className="ms-4">
        Publier
      </Button>
    </>
  );
};

export default Btns;
