
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import {Routes, Route} from 'react-router-dom';

import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import Home from'./Components/Home/Home';
import Profile from './Components/Profile/Profile';
import NotFound from './Components/NotFound/NotFound';

function App() {
  return <div className="App">
      <Routes> 
        <Route path="/login" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/" element={<Home/>} />
        <Route path="/profile/:id" element={<Profile/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
  </div>;
}

export default App;
