import React, { useState } from "react";

const UserContextTest = React.createContext({
  token: "",
  userId: () => {},
  role: () => {},
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
  authHeader: () => {},
});

export const UserProvider = (props) => {
  const tokenStorage = localStorage.getItem("user");
  const [tokenData, setTokenData] = useState(tokenStorage);
  const isLoggedIn = !!tokenData;

  const handleUserId = () => {
    const userIdStorage = localStorage.getItem("userId");

    if (userIdStorage) {
      return userIdStorage;
    }
  };

  const handleUserRole = () => {
    const roleStorage = localStorage.getItem("role");

    if (roleStorage) {
      return roleStorage;
    }
  };

  const authHeaderHandler = () => {
    const userToken = localStorage.getItem("user");

    if (userToken) {
      return { Authorization: "Bearer " + userToken };
    }
  };

  const loginHandler = (tokenStorage, userIdStorage, roleStorage) => {
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
    userId: handleUserId,
    role: handleUserRole,
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
