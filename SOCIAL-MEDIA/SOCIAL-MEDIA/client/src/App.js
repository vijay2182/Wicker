import React, { useContext } from "react";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { AuthContext } from "./context/AuthContext";

function App() {
  const {user} = useContext(AuthContext);
  return (
      <Router>
        <Routes>
        <Route exact path = "/" element = {user? <Home/> : <Register/>} />
          <Route exact path = "/register" element ={<Register/>} />
          <Route exact path = "/login" element = {<Login/>} />
          <Route exact path = "/profile" element = {<Profile/>} />
        </Routes>
      </Router>
  );
}

export default App;
