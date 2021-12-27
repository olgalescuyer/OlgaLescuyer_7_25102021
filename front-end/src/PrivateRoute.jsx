import React from "react";
import { Navigate } from "react-router-dom";

import useAuth from "./services/use-auth";

const PrivateRoute = ({ children }) => {
  const auth = useAuth();
  // console.log(auth);
  return auth ? children : <Navigate to="/login" />;
};

export default PrivateRoute;
