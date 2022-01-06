import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";
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

  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route
            index
            path="/"
            element={!userContext.isLoggedIn ? <Home /> : <Login />}
          />
          <Route
            path="/profile/:id"
            element={!userContext.isLoggedIn ? <Profile /> : <Login />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
