import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Cookies } from 'react-cookie';

function Lnb({ isOpen, handleItemClick }) {
    const cookies = new Cookies();
    const token = cookies.get('access-token');
    const info = localStorage.getItem('userInfo');
    const USERINFO = JSON.parse(info);
    const navigate = useNavigate();

    const [items, setItems] = useState([
        { id: 1, name: '홈', link: '/' },
        { id: 2, name: '음악', link: '/' },
        { id: 3, name: '일상', link: '/' },
        { id: 4, name: '도서', link: '/' },
        { id: 5, name: 'ASMR', link: '/' },
    ]);

    const LogoutBtnHandler = () => {
        cookies.remove('access-token');
        navigate('/selectlogin');
    };

    return (
        <LnbLayout isOpen={isOpen}>
            <LnbCloseBtnContainer>
                <LnbCloseBtn onClick={handleItemClick}>
                    <AiOutlineLeft size={20} />{' '}
                </LnbCloseBtn>
            </LnbCloseBtnContainer>
            {token ? (
                <LoginTrueFalseContainer to={`/profile/${USERINFO.id}`}>
                    {USERINFO.userName === 'undefined' ? (
                        <div>프로필을 등록해주세요</div>
                    ) : (
                        <div>{USERINFO.userName}</div>
                    )}
                    <AiOutlineRight size={20} />
                </LoginTrueFalseContainer>
            ) : (
                <LoginTrueFalseContainer to={'/selectlogin'}>
                    <div>로그인/회원가입</div>
                    <AiOutlineRight size={20} />
                </LoginTrueFalseContainer>
            )}
            <LnbMenuLayout>
                {items.map((item) => (
                    <div key={item.id}>
                        <Link to={item.link} onClick={handleItemClick}>
                            {item.name}
                        </Link>
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
    width: ${({ isOpen }) => (isOpen ? '350px' : '0px')};
    position: absolute;
    top: 0;
    left: 0;
    height: 95.4%;
    transition: opacity 0.2s ease, width 0.3s ease;
    background-color: white;
    z-index: 999;
    margin-top: 40px;
`;
const LnbMenuLayout = styled.div`
    height: 300px;
    padding: 25px;
    /* border: 1px solid black; */
    a {
        height: fit-content;
        width: fit-content;
        /* border: 1px solid black; */
        display: block;
        font-size: 20px;
        margin-bottom: 20px;
        color: #333;
        text-decoration: none;
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
const LoginTrueFalseContainer = styled(Link)`
    margin: 40px 0px 40px 0px;
    /* border: 1px solid black; */
    width: 100%;
    height: 30px;
    padding: 0px 10px 0px 25px;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
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
