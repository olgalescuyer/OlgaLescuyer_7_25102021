import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = (props) => {
  const [auth, setAuth] = useState(true);

  const toggleAuth = () => {
    setAuth(!auth);
  };
  // console.log(auth);

  const authHeader = () => {

    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user ) {
        // console.log(user);
      return { Authorization: 'Bearer ' + user }; 
    } ;
  }

  return (
    <UserContext.Provider value={{ auth, toggleAuth,authHeader }}>
      {props.children}
    </UserContext.Provider>
  );
};
