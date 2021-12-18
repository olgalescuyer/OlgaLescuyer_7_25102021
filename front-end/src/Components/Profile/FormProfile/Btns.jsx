import React from "react";
import Button from "react-bootstrap/Button";

const Btns = ({ login, signup }) => {
  return (
    <>
      <Button variant="primary" type="submit" className="w-100 mb-4">
        Confirmer les modifications
      </Button>

      <Button variant="secondary" className="w-100">
        Supprimer le compte
      </Button>
    </>
  );
};

export default Btns;
