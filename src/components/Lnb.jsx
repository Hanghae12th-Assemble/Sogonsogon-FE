import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Cookies } from 'react-cookie';

function Lnb({ isOpen, handleItemClick }) {
    const cookies = new Cookies();
    const token = cookies.get('access-token');
    const info = localStorage.getItem('userInfo');
    const username = JSON.parse(info);
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
        cookies.remove('access-token');
        localStorage.removeItem('userInfo');
        document.startViewTransition(() => navigate('/selectlogin'));
    };

    return (
        <LnbLayout isOpen={isOpen}>
            <LnbCloseBtnContainer>
                <LnbCloseBtn onClick={handleItemClick}>
                    <AiOutlineLeft size={20} />{' '}
                </LnbCloseBtn>
            </LnbCloseBtnContainer>
            {token ? (
                <>
                    <LoginTrueFalseContainer
                        onClick={() => {
                            document.startViewTransition(() =>
                                navigate(`profile/${username.userName}`)
                            );
                        }}
                    >
                        <div>{username.userName}님</div>
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
            {token && <LogoutBtnLayout onClick={LogoutBtnHandler}>로그아웃</LogoutBtnLayout>}
        </LnbLayout>
    );
}

export default Lnb;

const LnbLayout = styled.div`
    display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
    /* opacity: ${({ isOpen }) => (isOpen ? 1 : 0)}; */
    width: ${({ isOpen }) => (isOpen ? '350px' : '0px')};
    position: absolute;
    top: 0;
    left: 0;
    height: 95.8%;
    transition: opacity 0.2s ease, width 0.3s ease-out;
    background-color: white;
    z-index: 999;
    margin-top: 40px;
    /* border: 1px solid black; */
`;
const LnbMenuLayout = styled.div`
    height: 300px;
    padding: 25px;
    /* border: 1px solid black; */

    div {
        cursor: pointer;
        height: fit-content;
        width: fit-content;
        display: block;
        font-size: 20px;
        margin-bottom: 20px;
        color: #333;
    }
`;

const LnbCloseBtnContainer = styled.div`
    /* border: 1px solid black; */
    height: 40px;
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding-right: 3px;
`;

const LnbCloseBtn = styled.button`
    background: none;
    border: none;
    cursor: pointer;
`;
const LoginTrueFalseContainer = styled.div`
    margin: 40px 0px 0px 0px;
    width: 100%;
    height: 30px;
    font-size: 25px;
    padding: 0px 10px 0px 25px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    cursor: pointer;
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
    margin: 30px 0px 0px 25px;
    width: 54px;
    height: 17px;
    font-size: 13px;
    color: grey;
    /* border: 1px solid black; */
    cursor: pointer;
`;
