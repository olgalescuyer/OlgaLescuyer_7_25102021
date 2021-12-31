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

  return (
    <UserContext.Provider value={{  authHeader }}>
      {props.children}
    </UserContext.Provider>
  );
};
