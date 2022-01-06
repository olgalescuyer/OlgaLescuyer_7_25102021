import React, { useState, useEffect, useContext } from "react";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";

import { UserProvider } from "./Context/UserContextTest";
import UserContextTest from "./Context/UserContextTest";

function App() {
  const userContext = useContext(UserContextTest);

  
  const [auth, setAuth] = useState(null);

  useEffect(() => {
    let user = localStorage.getItem("authUser");
    user && JSON.parse(user) ? setAuth(true) : setAuth(false);
  }, []);

  useEffect(() => {
    localStorage.setItem("authUser", auth);
  }, [auth]);

  const { id } = useParams();
  // console.log(id);

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          {!auth && (
            <>
              <Route path="/" element={<Navigate to={"/login"} />} />
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
              <Route index path="/" element={<Home />} />
              <Route path="/profile/:id" element={<Profile />} />
            </>
          )}

          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
