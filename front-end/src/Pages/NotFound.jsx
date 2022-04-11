import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import cat from "../Assets/Gif/cat.gif";

import Logo from "../Components/Logo";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Container>
      <Container className="d-flex justify-content-center flex-column w-custom-limit-400 mt-4">
        <Logo />
        <h1 className="text-center  mt-4">Oops, cette page n'existe pas...</h1>
        <Button className="btn btn-primary mt-4" onClick={() => navigate("/")}>
          Retourner à la page d'accueil
        </Button>
        <Container className="d-flex justify-content-center pt-4">
          <img src={cat} alt="cat" className=" rounded" />
        </Container>
      </Container>
    </Container>
  );
}
