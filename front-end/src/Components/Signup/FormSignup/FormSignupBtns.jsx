import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const FormSignupBtns = ({ login, signup }) => {
  const navigate = useNavigate();

  return (
    <>
      <Button variant="primary" type="submit" className="w-100">
        {signup}
      </Button>
      <br />
      <br />
      <div className=" d-flex justify-content-center w-100 ">
        <span className="w-50 border-bottom border-secondary"></span>

        <div className="position-relative  w-25">
          <span className="position-absolute top-50 start-50 translate-middle fst-italic fw-bold text-muted">
            ou
          </span>
        </div>

        <span className="w-50 border-bottom border-secondary"></span>
      </div>
      <br />
      <Button
        variant="secondary"
        className="w-100"
        onClick={() => navigate("/login")}
      >
        {login}
      </Button>
    </>
  );
};

export default FormSignupBtns;