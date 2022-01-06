import React, { useState } from "react";

const UserContextTest = React.createContext({
  token: "",
  userId: 0,
  role: "",
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  authHeader: () => {},
});

export const UserProvider = (props) => {
  const tokenStorage = localStorage.getItem("user");

  const userIdStorage = localStorage.getItem("userId");

  const roleStorage = localStorage.getItem("role");

  const [tokenData, setTokenData] = useState(tokenStorage);

  const isLoggedIn = !!tokenData;

  const authHeaderHandler = () => {
    const userToken = localStorage.getItem("user");

    if (userToken) {
      return { Authorization: "Bearer " + userToken };
    }
  };

  const loginHandler = (tokenStorage, userIdStorage, roleStorage) => {
    console.log("ok");

    setTokenData(tokenStorage);
    localStorage.setItem("user", tokenStorage);
    localStorage.setItem("userId", userIdStorage);
    localStorage.setItem("role", roleStorage);
  };

  const logoutHandler = () => {
    setTokenData(null);
    localStorage.removeItem("user");
    localStorage.removeItem("role");
    localStorage.removeItem("userId");
  };

  const contextValue = {
    token: tokenData,
    userId: userIdStorage,
    role: roleStorage,
    isLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    authHeader: authHeaderHandler,
  };

  return (
    <UserContextTest.Provider value={contextValue}>
      {props.children}
    </UserContextTest.Provider>
  );
};

export default UserContextTest;
