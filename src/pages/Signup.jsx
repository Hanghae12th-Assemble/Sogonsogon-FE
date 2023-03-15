import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { __siginup } from "../redux/module/signup";
import Input from "../elements/Input";

function Sginup() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const handleLogin = (data) => {
    console.log(data);
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
        <Input
          register={register}
          type={"password"}
          name={"password"}
          placeholder={"비밀번호를 입력해주세요."}
          validation={{
            required: "비밀번호를 입력해주세요.",
            pattern: {
              value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[~!@#$%^&*()_+]).+$/,
              message:
                "영어 소문자와 숫자, 특수문자 조합의 8-20자로 입력해주세요.",
            },
          }}
          errors={errors}
        />
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
        <Input
          register={register}
          type={"text"}
          name={"nickname"}
          placeholder={"닉네임을 입력해주세요."}
          validation={{ required: "닉네임를 입력해주세요." }}
          errors={errors}
        />
        <button>제출</button>
      </form>
    </div>
  );
}

export default Sginup;
