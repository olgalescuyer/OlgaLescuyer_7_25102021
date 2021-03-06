import React, { useContext } from "react";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import HeaderLayout from "./Components/HeaderLayout";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";

import { UserProvider } from "./Context/UserContext";
import UserContext from "./Context/UserContext";

// for protectection roots '/home' & '/profile' I need to check the localStorage by userContext & create a function 'RequireAuth'
// + Redirect them to the /login page, but save the current location they were trying to go to when they were redirected :
const RequireAuth = ({ children }) => {
  const userContext = useContext(UserContext);
  const location = useLocation();
  // console.log("isLoggedin", userContext.isLoggedIn);
  return userContext.isLoggedIn ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <HeaderLayout />
              </RequireAuth>
            }
          >
            <Route
              index
              element={
                <RequireAuth>
                  <Home />
                </RequireAuth>
              }
            />
            <Route
              path="profile/:id"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />
          </Route>

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
