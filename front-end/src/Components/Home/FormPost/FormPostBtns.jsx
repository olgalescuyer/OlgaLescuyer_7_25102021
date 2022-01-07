import React from "react";
import Button from "react-bootstrap/Button";

const Btns = ({onCancel}) => {
  return (
    <>
      <Button variant="primary" type="submit">
        Publier
      </Button>
      <Button variant="outline-secondary" className="ms-3" onClick={()=>onCancel()}>
        Annuler
      </Button>
    </>
  );
};

export default Btns;
