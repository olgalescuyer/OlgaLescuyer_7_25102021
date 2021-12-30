import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import NotFound from "./Pages/NotFound";

import PrivateRoute from "./PrivateRoute";

import { UserProvider } from "./Context/UserContext";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            index
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </UserProvider>
    </div>
  );
}

export default App;
