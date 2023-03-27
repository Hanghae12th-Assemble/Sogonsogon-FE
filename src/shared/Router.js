import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Creatradio from "../pages/Createradio";
import Profile from "../pages/Profile";
import Tag from "../pages/Tag";
import Selectlogin from "../pages/SelectLogin";
import Signup from "../pages/Signup";
import ListenRadio from "../pages/ListenRadio";
import Emaillogin from "../pages/Emaillogin";
import Notfound from "../pages/Notfound";
import Search from "../pages/Search";
import KakkaoRedirect from "../pages/KakkaoRedirect";
import { routers } from "../constants/router";
import RadioPreview from "../pages/RadioPreview";
import NaverRedirect from "../pages/NaverRedirect";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path={`/${routers.CREATERADIO}`} element={<Creatradio />} />
        <Route path={`/${routers.SELECTLOGIN}`} element={<Selectlogin />} />
        <Route path={`/${routers.SIGNUP}`} element={<Signup />} />
        <Route path={`/${routers.LISTENRADIO}`} element={<ListenRadio />} />
        <Route path={`/${routers.EMAILLOGIN}`} element={<Emaillogin />} />
        <Route path={`/${routers.PROFILE}`} element={<Profile />} />
        <Route path={`/${routers.SEARCH}`} element={<Search />} />
        <Route path={`/${routers.TAG}`} element={<Tag />} />
        <Route path={`/${routers.RADIOPREVIEW}`} element={<RadioPreview />} />
        <Route path={`/${routers.KAKAORE}`} element={<KakkaoRedirect />} />
        <Route path={`/${routers.NAVERRE}`} element={<NaverRedirect />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
