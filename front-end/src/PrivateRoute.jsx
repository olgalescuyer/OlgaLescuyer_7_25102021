import React, { useContext } from "react";
import { Navigate, useLocation, Route } from "react-router-dom";

import { UserContext } from "./Context/UserContext";


const PrivateRoute = ({ children }) => {
  const { auth, authHeader } = useContext(UserContext);
  const authSecondly = authHeader(); 

  console.log("auth from context : ", auth);
  console.log("auth from localStorage : ", authSecondly);

  return auth || authSecondly ? children : <Navigate to="/login" />;
  
};

export default PrivateRoute;
