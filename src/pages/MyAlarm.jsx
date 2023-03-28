import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getAlarm } from '../redux/module/getAlarm';
import { __readAlarm } from '../redux/module/readAlarm';
import Navbar from '../components/Navbar';
import { AiOutlineArrowLeft, AiOutlineClose } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

function MyAlarm() {
    const navigate = useNavigate();
    const data = useSelector((state) => state.gettingAlarm);
    const readingAlarm = useSelector((state) => state.readingAlarm);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getAlarm());
    }, [readingAlarm]);

    const notificationReadHandler = (notificationID) => {
        dispatch(__readAlarm(notificationID));
    };
    return (
        <>
            <NavbarContainer>
                <Navbar
                    toNavigate={'/'}
                    iconleft={
                        <AiOutlineArrowLeft
                            size={20}
                            onClick={() => {
                                document.startViewTransition(() => navigate('/'));
                            }}
                        />
                    }
                    title={'알림'}
                    iconright={<AiOutlineClose size={20} />}
                />
            </NavbarContainer>
            <MyAlarmContainer>
                {data?.alarm?.data?.map((item) => {
                    return (
                        <>
                            <MyAlarmLayout>
                                {' '}
                                <MyAlarmProfileImg />
                                <MyAlarmDescContainer>
                                    <div>{item.message}</div>
                                    <div>{item.createdAt}</div>
                                </MyAlarmDescContainer>
                                <MyAlarmBtnContainer>
                                    {item.readStatus ? '읽음' : '안읽음'}{' '}
                                    <button
                                        onClick={() => notificationReadHandler(item.notificationId)}
                                    >
                                        읽음버튼
                                    </button>
                                </MyAlarmBtnContainer>
                            </MyAlarmLayout>
                        </>
                    );
                })}
            </MyAlarmContainer>
            ;
        </>
    );
}

export default MyAlarm;

const NavbarContainer = styled.div`
    padding: 0px 20px;
`;

const MyAlarmContainer = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    grid-gap: 20px;
    padding: 20px 25px 0px 25px;
    z-index: -1;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
`;

const MyAlarmLayout = styled.div`
    border: 1px solid black;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
`;

const MyAlarmProfileImg = styled.div`
    border: 1px solid black;
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 100%;
    margin: 0px 20px 0px 20px;
    opacity: 0.9;
    background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    align-items: flex-end;
    display: flex;
    flex-direction: row-reverse;
    transition: all 0.5s ease-in-out 0s;
    :hover {
        transform: scale(1);
        box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
        transition: all 0.3s ease-in-out 0s;
    }
`;

const MyAlarmDescContainer = styled.div`
    border: 1px solid blue;
`;

const MyAlarmBtnContainer = styled.div`
    border: 1px solid red;
`;
