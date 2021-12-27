import React from "react";

const validService = () => {

  const regex = {
    firstName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    lastName: /^[a-zA-Z\u0080-\u024F\s-]{2,25}$/i,
    password: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
    email: /^[A-Za-z0-9]+(.|_)+[A-Za-z0-9]+@+groupomania.fr$/,
    title: /^[a-zA-Z\u0080-\u024F\s-]{2,255}$/i,
    text: /^[a-zA-Z\u0080-\u024F\s-]{2,255}$/i,
  };
};

export default validService;
