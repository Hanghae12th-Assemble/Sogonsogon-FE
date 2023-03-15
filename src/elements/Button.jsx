import React from "react";
import styled, { css } from "styled-components";

const Button = ({ children, ...props }) => {
  return (
    <>
      <BtnStyle onClick={props.deleteItem} {...props}>
        {children}
      </BtnStyle>
    </>
  );
};

const BtnStyle = styled.button`
  border: none;
  border-radius: 0.625rem;
  font-weight: bold;
  cursor: pointer;
  ${(props) =>
    props.smBtn &&
    css`
      width: 1rem;
      height: 1rem;
    `}
  ${(props) =>
    props.lgBtn &&
    css`
      width: 25rem;
      height: 3rem;
    `}
`;

export default Button;
