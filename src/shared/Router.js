import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import CreateAudio from "../pages/CreateAudio";
import Profile from "../pages/Profile";
import Tag from "../pages/Tag";
import Selectlogin from "../pages/SelectLogin";
import Signup from "../pages/Signup";
import ListenAudio from "../pages/ListenAudio";
import Emaillogin from "../pages/Emaillogin";
import Notfound from "../pages/Notfound";
import Search from "../pages/Search";
import KakkaoRedirect from "../pages/KakkaoRedirect";
import { routers } from "../constants/router";
import AudioPreview from "../pages/AudioPreview";
import NaverRedirect from "../pages/NaverRedirect";
import MyAlarm from "../pages/MyAlarm";

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<Notfound />} />
        <Route path="/" element={<Home />} />
        <Route path={`/${routers.CREATERADIO}`} element={<CreateAudio />} />
        <Route path={`/${routers.SELECTLOGIN}`} element={<Selectlogin />} />
        <Route path={`/${routers.SIGNUP}`} element={<Signup />} />
        <Route path={`/${routers.LISTENRADIO}`} element={<ListenAudio />} />
        <Route path={`/${routers.EMAILLOGIN}`} element={<Emaillogin />} />
        <Route path={`/${routers.PROFILE}`} element={<Profile />} />
        <Route path={`/${routers.SEARCH}`} element={<Search />} />
        <Route path={`/${routers.TAG}`} element={<Tag />} />
        <Route path={`/${routers.RADIOPREVIEW}`} element={<AudioPreview />} />
        <Route path={`/${routers.KAKAORE}`} element={<KakkaoRedirect />} />
        <Route path={`/${routers.NAVERRE}`} element={<NaverRedirect />} />
        <Route path={`/${routers.MYALARM}`} element={<MyAlarm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
