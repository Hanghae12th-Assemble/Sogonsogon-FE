import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";

function Login() {
  const navigate = useNavigate();

  return (
    <LoginBox>
      <LoginContainer>
        <LoginBackSpan>
          <span
            onClick={() => {
              document.startViewTransition(() => navigate("/"));
            }}
          >
            나중에 하기
          </span>
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
            <LoginSpanText>
              <div
                onClick={() => {
                  document.startViewTransition(() => navigate("/maillogin"));
                }}
              >
                이메일로 로그인
              </div>{" "}
              /{" "}
              <div
                onClick={() => {
                  document.startViewTransition(() => navigate("/signup"));
                }}
              >
                회원가입
              </div>
            </LoginSpanText>
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
  height: 18.75rem;
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
  //border: 1px solid red;
  margin-top: 3.125rem;
  cursor: pointer;
`;
const LoginSpanText = styled.span`
  //border: 1px solid red;
  display: flex;
  justify-content: space-between;
  width: 11.25rem;
`;

const LoginBackSpan = styled.div`
  //border: 1px solid black;
  margin-top: 1.875rem;
  display: flex;
  justify-content: flex-end;
  padding: 0 1.875rem;
`;
