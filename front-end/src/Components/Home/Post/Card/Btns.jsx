import React, { useContext } from "react";
import { UserContext } from "../../../../Context/UserContext";
import Button from "react-bootstrap/Button";

const Btns = ({ userId }) => {
  const { id, role } = useContext(UserContext);

  if (userId === id) {
    return (
      <div>
        <Button variant="outline-secondary" type="submit" className="">
          Supprimer
        </Button>
        <Button variant="primary" className="ms-3">
          Modifier
        </Button>
      </div>
    );
  } else if (role === "admin") {
    return (
      <div>
        <Button variant="outline-secondary" type="submit" className="ms-3">
          Supprimer
        </Button>
      </div>
    );
  }

  return null;
};

export default Btns;
