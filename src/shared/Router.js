import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Creatradio from "../pages/Createradio";
import Monitor from "../pages/Monitor";
import Profile from "../pages/Profile";
import Tag from "../pages/Tag";
import Login from "../pages/SelectLogin";
import Signup from "../pages/Signup";
import Notfound from "../pages/Notfound";
import { routers } from "../constants/router";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path={`/${routers.CREATERADIO}`} element={<Creatradio />} />
        <Route path={`/${routers.LOGIN}`} element={<Login />} />
        <Route path={`/${routers.SIGNUP}`} element={<Signup />} />
        <Route path={`/${routers.MONITOR}`} element={<Monitor />} />
        <Route path={`/${routers.PROFILE}`} element={<Profile />} />
        <Route path={`/${routers.TAG}`} element={<Tag />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
