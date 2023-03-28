import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getAlarm } from '../redux/module/getAlarm';
import { __readAlarm } from '../redux/module/readAlarm';
import Navbar from '../components/Navbar';
import { AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose, AiOutlineSync } from 'react-icons/ai';
import styled from 'styled-components';

function MyAlarm() {
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
                    iconleft={<AiOutlineArrowLeft size={20} />}
                    title={'알림'}
                    iconright={
                        <AiOutlineSync
                            size={20}
                            cursor={'pointer'}
                            onClick={() => dispatch(__getAlarm())}
                        />
                    }
                />
            </NavbarContainer>
            <MyAlarmContainer>
                {data?.alarm?.data?.map((item) => {
                    return (
                        <div key={item.notificationId}>
                            <MyAlarmLayout>
                                {' '}
                                <MyAlarmProfileImg />
                                <MyAlarmDescContainer>
                                    <MyAlarmDescLayout>{item.message}</MyAlarmDescLayout>
                                    <MyAlarmTimeLayout>{item.createdAt}</MyAlarmTimeLayout>
                                </MyAlarmDescContainer>
                                <MyAlarmBtnContainer>
                                    {item.readStatus ? (
                                        <AiOutlineCheck size={25} color={'grey'} />
                                    ) : (
                                        <AiOutlineCheck
                                            size={25}
                                            color={'#ff9900'}
                                            cursor={'pointer'}
                                            onClick={() =>
                                                notificationReadHandler(item.notificationId)
                                            }
                                        />
                                    )}{' '}
                                    <AiOutlineClose size={25} />
                                </MyAlarmBtnContainer>
                            </MyAlarmLayout>
                        </div>
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
    /* border: 1px solid black; */
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
`;

const MyAlarmProfileImg = styled.div`
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
    /* border: 1px solid blue; */
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MyAlarmBtnContainer = styled.div`
    padding: 5px 5px;
    /* border: 1px solid red; */
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const MyAlarmDescLayout = styled.div`
    min-height: 55px;
    display: flex;
    align-items: center;
    line-height: 19px;
    font-size: 16px;
    font-weight: 500;
`;
const MyAlarmTimeLayout = styled.div`
    color: #a7a49e;
`;
