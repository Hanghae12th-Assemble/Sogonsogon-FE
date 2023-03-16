import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineLeft } from 'react-icons/ai';
import { Cookies } from 'react-cookie';

function Lnb({ isOpen, handleItemClick }) {
    const cookies = new Cookies();
    const token = cookies.get('access-token');
    console.log(token);

    const [items, setItems] = useState([
        { id: 1, name: '홈', link: '/' },
        { id: 2, name: '음악', link: '/' },
        { id: 3, name: '일상', link: '/' },
        { id: 4, name: '도서', link: '/' },
        { id: 5, name: 'ASMR', link: '/' },
    ]);

    return (
        <LnbLayout isOpen={isOpen}>
            <LnbCloseBtnContainer>
                <LnbCloseBtn onClick={handleItemClick}>
                    <AiOutlineLeft size={20} />{' '}
                </LnbCloseBtn>
            </LnbCloseBtnContainer>
            <LoginTrueFalseContainer>
                <div>로그인/회원가입</div>
                <div>누구님</div>
            </LoginTrueFalseContainer>
            <LnbMenuLayout>
                {items.map((item) => (
                    <div key={item.id}>
                        <Link to={item.link} onClick={handleItemClick}>
                            {item.name}
                        </Link>
                    </div>
                ))}
            </LnbMenuLayout>
        </LnbLayout>
    );
}

export default Lnb;

const LnbLayout = styled.div`
    opacity: ${({ isOpen }) => (isOpen ? 1 : 0)};
    width: ${({ isOpen }) => (isOpen ? '350px' : '0px')};
    position: absolute;
    top: 0;
    left: 0;
    height: 90%;
    transition: opacity 0.2s ease, width 0.3s ease;
    background-color: white;
    z-index: 999;
    margin-top: 40px;
    box-shadow: rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
        rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
`;
const LnbMenuLayout = styled.div`
    height: 300px;
    padding: 10px;
    border: 1px solid black;
    a {
        border: 1px solid black;
        display: block;
        margin-bottom: 10px;
        color: #333;
        text-decoration: none;
    }
`;
const LnbCloseBtnContainer = styled.div`
    border: 1px solid black;
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
`;

const LnbCloseBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;
const LoginTrueFalseContainer = styled.div`
    margin-top: 30px;
    width: 100%;
    height: 120px;
    border: 1px solid black;
`;
