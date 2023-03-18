import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Creatradio from '../pages/Createradio';
import Monitor from '../pages/Monitor';
import Profile from '../pages/Profile';
import Tag from '../pages/Tag';
import Selectlogin from '../pages/SelectLogin';
import Signup from '../pages/Signup';
import Emaillogin from '../pages/Emaillogin';
import Notfound from '../pages/Notfound';
import Search from '../pages/Search';
import { routers } from '../constants/router';
import RadioPreview from '../pages/RadioPreview';

function Router() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/*" element={<Notfound />} />
                <Route path="/" element={<Home />} />
                <Route path={`/${routers.CREATERADIO}`} element={<Creatradio />} />
                <Route path={`/${routers.SELECTLOGIN}`} element={<Selectlogin />} />
                <Route path={`/${routers.SIGNUP}`} element={<Signup />} />
                <Route path={`/${routers.EMAILLOGIN}`} element={<Emaillogin />} />
                <Route path={`/${routers.MONITOR}`} element={<Monitor />} />
                <Route path={`/${routers.PROFILE}`} element={<Profile />} />
                <Route path={`/${routers.SEARCH}`} element={<Search />} />
                <Route path={`/${routers.TAG}`} element={<Tag />} />
                <Route path={`/${routers.RADIOPREVIEW}`} element={<RadioPreview />} />
            </Routes>
        </BrowserRouter>
    );
}

export default Router;
