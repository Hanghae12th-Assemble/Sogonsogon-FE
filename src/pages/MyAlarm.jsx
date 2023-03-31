import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getAlarm } from '../redux/module/getAlarm';
import { __readAlarm } from '../redux/module/readAlarm';
import { __removeAlarm } from '../redux/module/removeAlarm';
import Navbar from '../components/Navbar';
import { AiOutlineArrowLeft, AiOutlineCheck, AiOutlineClose, AiOutlineSync } from 'react-icons/ai';
import styled from 'styled-components';

function MyAlarm() {
    const { gettingAlarm, readingAlarm, removingAlarm } = useSelector((state) => state);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getAlarm());
    }, [readingAlarm, removingAlarm]);

    useEffect(() => {
        markAllAlarmsAsRead();
    }, []);
    async function markAllAlarmsAsRead() {
        const alarms = await dispatch(__getAlarm());
        const unreadAlarms = alarms?.payload?.data.filter((alarm) => !alarm.readstatus);
        if (unreadAlarms.length > 0) {
            unreadAlarms.forEach((alarm) => {
                dispatch(__readAlarm(alarm.notificationId));
            });
        }
    }

    const notificationReadHandler = (notificationId) => {
        dispatch(__readAlarm(notificationId));
    };

    const removeAlarmHandler = (notificationId) => {
        dispatch(__removeAlarm(notificationId));
    };

    return (
        <>
            <NavbarContainer>
                <Navbar
                    toNavigate={'/'}
                    iconleft={<AiOutlineArrowLeft size={25} />}
                    title={'알림'}
                    iconright={
                        <AiOutlineSync
                            size={25}
                            cursor={'pointer'}
                            onClick={() => {
                                dispatch(__getAlarm());
                                markAllAlarmsAsRead();
                            }}
                        />
                    }
                />
            </NavbarContainer>
            <MyAlarmContainer>
                {gettingAlarm?.alarm?.data?.map((item) => {
                    return (
                        <div key={item.notificationId}>
                            <MyAlarmLayout>
                                {' '}
                                <MyAlarmProfileImg
                                    backgroundImageUrl={item.senderProfileImageUrl}
                                />
                                <MyAlarmDescContainer>
                                    <MyAlarmDescLayout>
                                        <p>{item.message}</p>
                                    </MyAlarmDescLayout>
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
                                    <AiOutlineClose
                                        cursor={'pointer'}
                                        onClick={() => removeAlarmHandler(item.notificationId)}
                                        size={25}
                                    />
                                </MyAlarmBtnContainer>
                            </MyAlarmLayout>
                        </div>
                    );
                })}
            </MyAlarmContainer>
        </>
    );
}

export default MyAlarm;

const NavbarContainer = styled.div`
    padding: 0px 20px;
`;

const MyAlarmContainer = styled.div`
    border: 1px solid #f0efed;
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
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
    padding: 10px 0px 10px 30px;
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
    /* border: 1px solid black; */
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
