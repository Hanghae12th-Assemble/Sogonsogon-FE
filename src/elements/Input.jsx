import React from "react";
import styled from "styled-components";

const Input = ({ register, type, name, placeholder, validation, errors }) => {
  return (
    <div>
      <InputBox
        {...register(name, validation)}
        type={type}
        placeholder={placeholder}
      />
      <span>{errors?.[name]?.message}</span>
    </div>
  );
};

export default Input;

const InputBox = styled.input`
  outline: none;
  width: 25rem;
  height: 3rem;
  border-radius: 0.625rem;
`;
