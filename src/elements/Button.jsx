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
      width: 25rem;
      height: 3rem;
      background-color: #ff9900;
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
      width: 45px;
      height: 45px;
      background-color: #ffffff;
      color: black;
      border-radius: 100%;
      border: none;
      bottom: 120px;
      left: 410px;
      z-index: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.5) 0px 5px 15px 0px;
    `}

        ${(props) =>
    props.AddRadioBtn &&
    css`
      position: absolute;
      width: 45px;
      height: 45px;
      background-color: #ff9900;
      color: white;
      border-radius: 100%;
      border: none;
      bottom: 0px;
      right: 0px;
      z-index: 900;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      box-shadow: rgba(0, 0, 0, 0.5) 0px 2px 5px 0px;
    `}

        ${(props) =>
    props.SortBtn &&
    css`
      width: fit-content;
      height: fit-content;
      border: none;
      font-size: 20px;
      background-color: white;
      color: rgb(153, 153, 153);
      cursor: pointer;
      margin-right: 8px;
      &.active {
        color: #000;
        font-weight: bold;
        outline: none;
      }
    `}
`;

export default Button;
