import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __siginup } from "../redux/module/signup";
import Input from "../elements/Input";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";
import Button from "../elements/Button";
import { useNavigate } from "react-router";

function Sginup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const handleLogin = async (data) => {
    const signupInfo = {
      membername: data.membername,
      password: data.password,
      email: data.email,
      nickname: data.nickname,
    };

    const action = await dispatch(__siginup(signupInfo));

    if (action.payload && action.payload >= 200 && action.payload < 300) {
      navigate("/");
    } else {
      alert("유저 이름 혹은 이메일이 중복 됩니다.");
    }

    reset();
  };

  return (
    <SignupContainer>
      <div>
        <Navbar
          toNavigate={"/selectlogin"}
          iconleft={<AiOutlineArrowLeft size={20} />}
          title={"회원가입"}
          iconright={<AiOutlineClose size={20} />}
          toClose={"/"}
        />
      </div>
      <SignupForm onSubmit={handleSubmit(handleLogin)}>
        <SignupInputDivBox>
          <SignupInputTitle>
            <span>닉네임*</span>
          </SignupInputTitle>
          <Input
            register={register}
            type={"text"}
            name={"nickname"}
            placeholder={"닉네임을 입력해주세요."}
            validation={{ required: "닉네임를 입력해주세요." }}
            errors={errors}
          />
        </SignupInputDivBox>
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
              required: "이메일를 입력해주세요.",
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
            <span>ID*</span>
          </SignupInputTitle>
          <Input
            register={register}
            type={"text"}
            name={"membername"}
            placeholder={"아이디를 입력해주세요."}
            validation={{
              required: "아이디을 입력해주세요.",
              pattern: {
                value: /^(?=.*[a-zA-Z])(?=.*\d).{4,10}$/,
                message: "영어, 숫자 포함 4-10글자로 해주세요.",
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

export default Sginup;

const SignupContainer = styled.div`
  height: 90%;
`;

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
