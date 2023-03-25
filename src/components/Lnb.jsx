import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineRight } from 'react-icons/ai';
import { getCookie, removeCookie } from '../util/cookie';
import { getLocalStorage, removeLocalStorage } from '../util/localStorage';

function Lnb({ isOpen, handleItemClick }) {
    const token = getCookie('access-token');
    const username = JSON.parse(getLocalStorage('userInfo'));
    const navigate = useNavigate();

    const [items, setItems] = useState([
        { id: 1, name: '홈', link: '/' },
        { id: 2, name: '음악', link: '/tag/음악' },
        { id: 3, name: '일상', link: '/tag/일상' },
        { id: 4, name: '도서', link: '/tag/도서' },
        { id: 5, name: 'ASMR', link: '/tag/ASMR' },
    ]);

    const categoryMenuBtnHandler = (link) => {
        document.startViewTransition(() => navigate(`${link}`));
        handleItemClick();
    };

    const LogoutBtnHandler = () => {
        removeCookie('access-token');
        removeLocalStorage('userInfo');
        document.startViewTransition(() => navigate('/selectlogin'));
    };

    return (
        <>
            <LnbLayout isOpen={isOpen}>
                {token && username ? (
                    <>
                        <LoginTrueFalseContainer
                            onClick={() => {
                                document.startViewTransition(() =>
                                    navigate(`/profile/${username.userName}`)
                                );
                            }}
                        >
                            <p>{username.userName}님</p>
                            <AiOutlineRight size={20} />
                        </LoginTrueFalseContainer>
                        <LoginHiLayout>안녕하세요!</LoginHiLayout>
                    </>
                ) : (
                    <>
                        <LoginTrueFalseContainer
                            onClick={() => {
                                document.startViewTransition(() => navigate('/selectlogin'));
                            }}
                        >
                            <div>로그인/회원가입</div>
                            <AiOutlineRight size={20} />
                        </LoginTrueFalseContainer>
                        <LoginHiLayout />
                    </>
                )}
                <LnbMenuLayout>
                    {items.map((item) => (
                        <div key={item.id}>
                            <div onClick={() => categoryMenuBtnHandler(item.link)}>{item.name}</div>
                        </div>
                    ))}
                </LnbMenuLayout>
                {token && username && (
                    <LogoutBtnLayout onClick={LogoutBtnHandler}>로그아웃</LogoutBtnLayout>
                )}
            </LnbLayout>
            <LnbBlackBackGround isOpen={isOpen} onClick={handleItemClick} />
        </>
    );
}

export default Lnb;

const LnbLayout = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    width: ${({ isOpen }) => (isOpen ? '350px' : '0px')};
    position: absolute;
    top: -40px;
    left: 0;
    height: 100%;
    transition: opacity 0.2s ease, width 0.3s ease-out;
    background-color: white;
    z-index: 999;
    margin-top: 40px;
`;

const LnbMenuLayout = styled.div`
    height: 300px;
    padding: 25px;
    margin-top: 80px;

    div {
        cursor: pointer;
        height: fit-content;
        width: fit-content;
        display: block;
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 20px;
        color: #333;
    }
`;

const LoginTrueFalseContainer = styled.div`
    margin: 120px 0px 0px 0px;
    width: 100%;
    height: 30px;
    padding: 0px 10px 0px 25px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
    p {
        font-size: 25px;
        font-weight: 500;
        text-decoration: underline 5px #ffc37c;
    }
    div {
        font-size: 20px;
        font-weight: bold;
    }
`;
const LoginHiLayout = styled.div`
    width: 100%;
    height: 30px;
    padding: 0px 0px 0px 25px;
    display: flex;
    align-items: center;
    color: grey;
    font-size: 14px;
`;

const LogoutBtnLayout = styled.div`
    margin: 120px 0px 0px 25px;
    width: 54px;
    height: 17px;
    font-size: 13px;
    color: grey;
    cursor: pointer;
`;

const LnbBlackBackGround = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    position: absolute;
    width: 100%;
    height: 100%;
    background-color: black;
    opacity: 0.7;
    z-index: 995;
    top: 0;
    bottom: 0;
`;
