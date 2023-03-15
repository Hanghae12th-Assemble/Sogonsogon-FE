import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __login } from "../redux/module/login";
import Input from "../elements/Input";

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
        <Input
          register={register}
          type={"text"}
          name={"email"}
          validation={{
            required: "이메일은 필수입니다.",
          }}
          placeholder={"이메일을 입력해주세요"}
          errors={errors}
        />
        <Input
          register={register}
          type={"password"}
          name={"password"}
          validation={{
            required: "비밀번호는 필수입니다.",
          }}
          placeholder={"비밀번호를 입력해주세요"}
          errors={errors}
        />
        <button>제출</button>
      </form>
    </div>
  );
}

export default Login;
