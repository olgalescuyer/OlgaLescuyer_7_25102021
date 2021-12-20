import React from "react";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const FormLoginBtns = ({ login, signup }) => {
  const navigate = useNavigate();

  // const handleClick = (e) => {

  //   e.preventDefault();
  //   getApi();
  //    navigate("/");
  // }

  // const getApi = () => {

  //   axios.get('http://localhost:3000/api/posts')
  //   .then(response => {
  //     console.log(response);
  
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //   });
  // }
  return (
    <>
      <Button variant="primary" type="submit" className="w-100" >
        {login}
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
        onClick={() => navigate("/signup")}
      >
        {signup}
      </Button>
    </>
  );
};

export default FormLoginBtns;
