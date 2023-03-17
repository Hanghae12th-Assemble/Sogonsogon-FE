import React from 'react';
import styled, { css } from 'styled-components';

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
            &:hover {
                background-color: #262626;
                color: white;
            }
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
            width: 30px;
            height: 30px;
            background-color: #aaa6a6;
            color: black;
            border-radius: 100%;
            border: none;
            font-size: 22px;
            bottom: 100px;
            left: 440px;
            z-index: 900;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
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
            margin-right: 12px;
            &.active {
                color: #000;
                font-weight: bold;
                outline: none;
            }
        `}
`;

export default Button;
