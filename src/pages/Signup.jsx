import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __siginup } from "../redux/module/signup";

function Sginup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = (data) => {
    const signupInfo = {
      membername: data.membername,
      password: data.password,
      email: data.email,
      nickname: data.nickname,
    };
    dispatch(__siginup(signupInfo));
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          {...register("membername", {
            required: "아이디을 입력해주세요.",
            pattern: {
              value: /^(?=.*[a-zA-Z])(?=.*\d).{4,10}$/,
              message: "영어, 숫자 포함 4-10글자로 해주세요.",
            },
          })}
          type="text"
          placeholder="아이디를 입력해주세요."
        />
        <span>{errors?.membername?.message}</span>
        <input
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+]).+$/,
              message:
                "영어 소문자와 숫자, 특수문자 조합의 8-20자로 입력해주세요.",
            },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <span>{errors?.password?.message}</span>
        <input
          {...register("email", {
            required: "이메일를 입력해주세요.",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "이메일 형식을 지켜주세요.",
            },
          })}
          type="text"
          placeholder="이메일을 입력해주세요."
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("nickname", { required: "닉네임를 입력해주세요." })}
          type="text"
          placeholder="닉네임을 입력해주세요."
        />
        <span>{errors?.nickname?.message}</span>
        <button>제출</button>
      </form>
    </div>
  );
}

export default Sginup;
