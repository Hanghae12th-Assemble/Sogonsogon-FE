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
      width: 10.9375rem;
      height: 3.25rem;
      &:hover {
        background-color: #262626;
        color: white;
      }
    `}

  ${(props) =>
    props.lgBtn &&
    css`
      width: 450px;
      height: 3rem;
      background-color: #ff9900;
      color: white;
    `}

    ${(props) =>
    props.smCommentBtn &&
    css`
      width: 5rem;
      height: 3.5rem;
      margin-left: 0.625rem;
      background-color: #ff9900;
      color: white;
    `}


    ${(props) =>
    props.GlgBtn &&
    css`
      width: 25rem;
      height: 3rem;
    `}
        
        
 ${(props) =>
    props.KlgBtn &&
    css`
      width: 25rem;
      height: 3rem;
      background-color: #fee500;
    `}

        ${(props) =>
    props.NlgBtn &&
    css`
      width: 25rem;
      height: 3rem;
      background-color: #03c75a;
    `}


    ${(props) =>
    props.CrRadioBtn &&
    css`
      width: 5rem;
      height: 2.5rem;
      border-radius: 1.25rem;
      outline: none;
      border: none;
      &:hover {
        background-color: #262626;
        color: white;
      }
    `}

    ${(props) =>
    props.TopBtn &&
    css`
      position: absolute;
      width: 2.8125rem;
      height: 2.8125rem;
      background-color: #ffffff;
      color: black;
      border-radius: 100%;
      border: none;
      bottom: 7.5rem;
      left: 25.625rem;
      z-index: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.5) 0rem 0.3125rem 0.9375rem 0rem;
    `}

        ${(props) =>
    props.AddRadioBtn &&
    css`
      position: absolute;
      width: 2.8125rem;
      height: 2.8125rem;
      background-color: #ff9900;
      color: white;
      border-radius: 100%;
      border: none;
      bottom: 0rem;
      right: 0rem;
      z-index: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.5) 0rem 0.125rem 0.3125rem 0rem;
    `}

        ${(props) =>
    props.SortBtn &&
    css`
      width: fit-content;
      height: fit-content;
      border: none;
      font-size: 1.25rem;
      background-color: white;
      color: rgb(153, 153, 153);
      cursor: pointer;
      margin-right: 0.5rem;
      &.active {
        color: #000;
        font-weight: bold;
        outline: none;
      }
    `}
`;

export default Button;
