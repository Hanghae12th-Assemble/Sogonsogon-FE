import React from "react";
import styled, { css } from "styled-components";

const Input = ({
  register,
  type,
  name,
  placeholder,
  validation,
  errors,
  asFor,
  ...props
}) => {
  return (
    <div>
      <InputBox
        {...register(name, validation)}
        as={asFor}
        type={type}
        {...props}
        placeholder={placeholder}
      />
      <InputMessage>
        <span>{errors?.[name]?.message}</span>
      </InputMessage>
    </div>
  );
};

export default Input;

const InputBox = styled.input`
  outline: none;
  width: 460px;
  height: 3rem;
  border-radius: 0.625rem;
  border: none;
  background-color: #f1f2f6;
  resize: none;
  ${(props) =>
    props.textarea &&
    css`
      width: 460px;
      height: 118px;
      border-radius: 10px;
      padding: 10px;
    `}
`;

const InputMessage = styled.div`
  margin-top: 0.625rem;
`;
