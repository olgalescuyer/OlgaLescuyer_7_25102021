import React from "react";
import Button from "react-bootstrap/Button";

const Btns = () => {
  return (
    <div>
      <Button variant="primary" className="">
        Modifier
      </Button>
      <Button variant="outline-secondary" type="submit" className="ms-3">
        Supprimer
      </Button>
    </div>
  );
};

export default Btns;