import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

function Login() {
  return (
    <LoginBox>
      <LoginContainer>
        <LoginBackSpan>
          <Link to={"/"}>
            <span>나중에 하기</span>
          </Link>
        </LoginBackSpan>
        <LoginLogoBox>
          <span>로고</span>
        </LoginLogoBox>
        <LoginButtonBox>
          <LoginButtonDiv>
            <Button lgBtn>카카오 로그인</Button>
          </LoginButtonDiv>
          <LoginButtonDiv>
            <Button lgBtn>네이버 로그인</Button>
          </LoginButtonDiv>
          <LoginButtonDiv>
            <Button lgBtn>구글로 로그인</Button>
          </LoginButtonDiv>
          <LoginSpanDiv>
            <Link to={"/signup"}>
              <span>이메일로 로그인 / 회원가입</span>
            </Link>
          </LoginSpanDiv>
        </LoginButtonBox>
      </LoginContainer>
    </LoginBox>
  );
}

export default Login;

const LoginBox = styled.div`
  //border: 1px solid black;
  height: 100%;
`;

const LoginContainer = styled.div`
  //border: 1px solid black;
  height: 100%;
  overflow: auto;
`;

const LoginLogoBox = styled.div`
  //border: 1px solid black;
  width: 100%;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButtonBox = styled.div`
  //border: 1px solid red;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3.125rem;
`;

const LoginButtonDiv = styled.div`
  //border: 1px solid red;
  margin-top: 1.25rem;
`;

const LoginSpanDiv = styled.div`
  // border: 1px solid red;
  margin-top: 3.125rem;
  cursor: pointer;
`;

const LoginBackSpan = styled.div`
  //border: 1px solid black;
  margin-top: 30px;
  display: flex;
  justify-content: flex-end;
  padding: 0 30px;
`;
