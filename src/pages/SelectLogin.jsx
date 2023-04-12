import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import { KAKAO_AUTH_URL } from "../constants/social";
import { NAVER_AUTH_URL } from "../constants/social";
import { ReactComponent as Logosymbol } from "../asset/logo/logosymbol.svg";

function Login() {
  const navigate = useNavigate();
  const handleKakakoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const handleNaveroLogin = () => {
    window.location.href = NAVER_AUTH_URL;
  };

  useEffect(() => {
    alert("소셜 로그인 꼭! 전부 동의 해주세요. ");
  }, []);

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
          <LoginLogo />
        </LoginLogoBox>
        <LoginButtonBox>
          <LoginButtonDiv>
            <Button onClick={handleKakakoLogin} KlgBtn>
              카카오 로그인
            </Button>
          </LoginButtonDiv>
          <LoginButtonDiv>
            <Button onClick={handleNaveroLogin} NlgBtn>
              네이버 로그인
            </Button>
          </LoginButtonDiv>
          <LoginButtonDiv>
            <Button
              onClick={() => {
                document.startViewTransition(() => navigate("/maillogin"));
              }}
              GlgBtn
            >
              이메일 로그인
            </Button>
          </LoginButtonDiv>
          <LoginSpanDiv>
            <LoginSpanText>
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
  height: 100%;
`;

const LoginContainer = styled.div`
  height: 100%;
  overflow: auto;
`;

const LoginLogoBox = styled.div`
  width: 100%;
  height: 18.75rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoginButtonBox = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin-top: 3.125rem;
`;

const LoginButtonDiv = styled.div`
  margin-top: 1.25rem;
`;

const LoginSpanDiv = styled.div`
  margin-top: 3.125rem;
  cursor: pointer;
`;
const LoginSpanText = styled.span`
  display: flex;
  justify-content: center;
  width: 11.25rem;
`;

const LoginBackSpan = styled.div`
  margin-top: 1.875rem;
  display: flex;
  justify-content: flex-end;
  padding: 0 1.875rem;
  span {
    cursor: pointer;
  }
`;

const LoginLogo = styled(Logosymbol)`
  width: 18.75rem;
`;
