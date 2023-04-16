import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Button from "../elements/Button";
import Input from "../elements/Input";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import { __login } from "../redux/module/login";
import { useNavigate } from "react-router-dom";
import isLogin from "../util/checkCookie";

function Emaillogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = (data) => {
    const loginInfo = {
      email: data.email,
      password: data.password,
    };
    dispatch(__login(loginInfo));
    navigate("/");
    reset();
  };

  useEffect(() => {
    if (isLogin() === true) {
      alert("이미 로그인 하였습니다.");
      navigate("/");
    }
  }, []);

  return (
    <SignupContainer>
      <SignupNavbarBox>
        <Navbar
          toNavigate={"/selectlogin"}
          iconleft={<AiOutlineArrowLeft size={20} />}
          title={"이메일로 로그인"}
          iconright={<AiOutlineClose size={20} />}
          toClose={"/"}
        />
      </SignupNavbarBox>
      <SignupForm onSubmit={handleSubmit(handleLogin)}>
        <SignupInputDivBox>
          <SignupInputTitle>
            <span>이메일*</span>
          </SignupInputTitle>
          <Input
            register={register}
            type={"text"}
            name={"email"}
            placeholder={"이메일을 입력해주세요."}
            validation={{
              required: "이메일을 입력해주세요.",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "이메일 형식을 지켜주세요.",
              },
            }}
            errors={errors}
          />
        </SignupInputDivBox>
        <SignupInputDivBox>
          <SignupInputTitle>
            <span>비밀번호*</span>
          </SignupInputTitle>
          <Input
            register={register}
            type={"password"}
            name={"password"}
            placeholder={"비밀번호를 입력해주세요."}
            validation={{
              required: "비밀번호를 입력해주세요.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+]).+$/,
                message:
                  "영어 대문자와 문자, 숫자, 특수문자 조합의 8-20자로 입력해주세요.",
              },
            }}
            errors={errors}
          />
        </SignupInputDivBox>
        <SignupButton>
          <Button lgBtn>다음</Button>
        </SignupButton>
      </SignupForm>
    </SignupContainer>
  );
}

export default Emaillogin;

const SignupContainer = styled.div`
  height: 90%;
`;

const SignupNavbarBox = styled.div``;

const SignupForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const SignupInputDivBox = styled.div`
  margin-top: 3.125rem;
`;

const SignupInputTitle = styled.div`
  margin-bottom: 0.625rem;
`;

const SignupButton = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  padding-bottom: 1.25rem;
`;
