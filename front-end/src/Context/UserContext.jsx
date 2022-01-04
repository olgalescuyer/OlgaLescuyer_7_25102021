import React, { createContext, useState } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const authHeader = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      // console.log(user);
      return { Authorization: "Bearer " + user };
    }
  };

  const id = JSON.parse(localStorage.getItem("userId"));

  const role = JSON.parse(localStorage.getItem("role"));

  return (
    <UserContext.Provider value={{ authHeader, id, role }}>
      {props.children}
    </UserContext.Provider>
  );
};
