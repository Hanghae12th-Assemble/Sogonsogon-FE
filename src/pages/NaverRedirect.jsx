import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../util/api/axios";

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
      await axios.get(
        `/api/member/login/naver?code=${loginData.code}&state=${loginData.state}`
      );

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
}

export default NaverRedirect;
