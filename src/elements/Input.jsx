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
  value,
  ...props
}) => {
  return (
    <div>
      <InputBox
        {...register(name, validation)}
        as={asFor}
        type={type}
        defaultValue={value}
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
  width: 28.75rem;
  height: 3rem;
  border-radius: 0.625rem;
  border: none;
  padding: 0 0.625rem;
  background-color: #f5f4f2;
  resize: none;
  ${(props) =>
    props.textarea &&
    css`
      width: 28.75rem;
      height: 7.375rem;
      border-radius: 0.625rem;
      padding: 0.625rem;
    `}

  ${(props) =>
    props.commentInput &&
    css`
      width: 21.875rem;
      height: 3.5rem;
      border-radius: 0.625rem;
      padding: 0.625rem;
    `}
`;

const InputMessage = styled.div`
  margin-top: 0.625rem;
`;
