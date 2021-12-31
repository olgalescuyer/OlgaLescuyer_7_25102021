import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";

// import NotFound from "./Pages/NotFound";
// import PrivateRoute from "./PrivateRoute";

import { UserProvider } from "./Context/UserContext";

function App() {
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("authUser");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("authUser", auth);
  },[auth]);

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          {!auth && (
            <>
              <Route
                path="/login"
                element={<Login authenticate={() => setAuth(true)} />}
              />
              <Route
                path="/signup"
                element={<Signup authenticate={() => setAuth(true)} />}
              />
            </>
          )}
          {auth && (
            <>
              <Route index element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
            </>
          )}

          <Route path="*" element={<Navigate to={auth ? "/" : "/login"} />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
