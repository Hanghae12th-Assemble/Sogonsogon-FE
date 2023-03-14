import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Addlive from "../pages/Addlive";
import Monitor from "../pages/Monitor";
import Notice from "../pages/Notice";
import Profile from "../pages/Profile";
import Tag from "../pages/Tag";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Notfound from "../pages/Notfound";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path="/addlive/:id" element={<Addlive />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/monitor" element={<Monitor />} />
        <Route path="/notice" element={<Notice />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/tag" element={<Tag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
