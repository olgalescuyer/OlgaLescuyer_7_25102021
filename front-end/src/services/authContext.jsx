import React, { createContext, useState } from "react";

export const AuthContext = createContext();

const AuthContexProvider = (props) => {
  const [auth, setAuth] = useState(false);
  return <AuthContext.Provider>{props.children}</AuthContext.Provider>;
};