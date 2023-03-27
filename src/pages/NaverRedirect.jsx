import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import QUERY from "../constants/query";
import Axios from "../util/api/axios";
import { setCookie } from "../util/cookie";

function NaverRedirect() {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");
  const state = new URL(window.location.href).searchParams.get("state");

  const loginData = {
    code: code,
    state: state,
  };

  useEffect(() => {
    naverLogin(loginData);
  }, []);

  const axios = new Axios(process.env.REACT_APP_BASE_URL);

  const naverLogin = async (loginData) => {
    try {
      const res = await axios.get(
        `/api/member/login/naver?code=${loginData.code}&state=${loginData.state}`
      );
      console.log(res);
      const Access_Token = res.headers.authorization;
      setCookie(QUERY.COOKIE.COOKIE_NAME, Access_Token);

      alert("네이버 로그인 성공");
      navigate("/");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div>
      <h1>Loading...</h1>
    </div>
  );
  return <div>NaverRedirect</div>;
}

export default NaverRedirect;
