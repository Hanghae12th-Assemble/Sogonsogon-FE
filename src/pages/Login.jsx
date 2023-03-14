import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login } from "../redux/module/login";

function Login() {
  const dispatch = useDispatch();
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
    reset();
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleLogin)}>
        <input
          {...register("email", { required: "이메일을 입력해주세요." })}
          type="text"
          placeholder="이메일 입력해주세요."
        />
        <span>{errors?.email?.message}</span>
        <input
          {...register("password", { required: "비밀번호를 입력해주세요." })}
          type="password"
          placeholder="비밀번호를 입력해주세요."
        />
        <span>{errors?.password?.message}</span>
        <button>제출</button>
      </form>
    </div>
  );
}

export default Login;
