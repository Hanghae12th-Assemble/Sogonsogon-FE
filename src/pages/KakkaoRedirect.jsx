import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "../util/api/axios";

function KakkaoRedirect() {
  const navigate = useNavigate();
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    kakakoLogin(code);
  }, []);

  const axios = new Axios(process.env.REACT_APP_BASE_URL);

  const kakakoLogin = async (code) => {
    try {
      await axios.get(`api/member/login/kakao?code=${code}`);

      alert("카카오 로그인 성공");
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

export default KakkaoRedirect;
