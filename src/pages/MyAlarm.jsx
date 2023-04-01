import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getAlarm } from '../redux/module/getAlarm';
import { __readAlarm } from '../redux/module/readAlarm';
import { __removeAlarm } from '../redux/module/removeAlarm';
import Navbar from '../components/Navbar';
import {
    AiOutlineArrowLeft,
    AiOutlineBorder,
    AiFillCheckSquare,
    AiOutlineSync,
} from 'react-icons/ai';
import styled from 'styled-components';

function MyAlarm() {
    const { gettingAlarm, readingAlarm, removingAlarm } = useSelector((state) => state);
    const [selectedAlarms, setSelectedAlarms] = useState([]);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(__getAlarm());
    }, [readingAlarm, removingAlarm]);

    const unReadAlarmHandler = () => {
        const unreadAlarms = gettingAlarm?.alarm?.data?.filter((alarm) => !alarm.readstatus);
        if (unreadAlarms.length > 0) {
            unreadAlarms.forEach((alarm) => {
                dispatch(__readAlarm(alarm.notificationId));
            });
        }
    };

    const toggleAlarmSelection = (notificationId) => {
        const index = selectedAlarms.indexOf(notificationId);
        if (index !== -1) {
            const updatedSelections = [...selectedAlarms];
            updatedSelections.splice(index, 1);
            setSelectedAlarms(updatedSelections);
        } else {
            setSelectedAlarms([...selectedAlarms, notificationId]);
        }
    };

    const removeSelectedAlarms = () => {
        selectedAlarms.forEach((notificationId) => {
            dispatch(__removeAlarm(notificationId));
        });
        setSelectedAlarms([]);
    };

    return (
        <>
            <NavbarContainer>
                <Navbar
                    toNavigate={'/'}
                    iconleft={<AiOutlineArrowLeft size={25} onClick={unReadAlarmHandler} />}
                    title={'알림'}
                    iconright={
                        <AiOutlineSync
                            size={25}
                            cursor={'pointer'}
                            onClick={() => {
                                dispatch(__getAlarm());
                                unReadAlarmHandler();
                            }}
                        />
                    }
                />
            </NavbarContainer>
            <MyAlarmContainer>
                {gettingAlarm?.alarm?.data?.map((item) => {
                    const isSelected = selectedAlarms.includes(item.notificationId);
                    return (
                        <div key={item.notificationId}>
                            <MyAlarmLayout isRead={item.readStatus}>
                                <MyAlarmBtnContainer>
                                    {isSelected ? (
                                        <AiFillCheckSquare
                                            color="#ff9900"
                                            cursor={'pointer'}
                                            onClick={() =>
                                                toggleAlarmSelection(item.notificationId)
                                            }
                                            size={25}
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                        />
                                    ) : (
                                        <AiOutlineBorder
                                            color="#ffe0b3"
                                            cursor={'pointer'}
                                            style={{
                                                marginLeft: '10px',
                                            }}
                                            size={25}
                                            onClick={() =>
                                                toggleAlarmSelection(item.notificationId)
                                            }
                                        />
                                    )}
                                </MyAlarmBtnContainer>
                                <MyAlarmProfileImg
                                    backgroundImageUrl={item.senderProfileImageUrl}
                                />
                                <MyAlarmDescContainer>
                                    <MyAlarmDescLayout>
                                        <p>{item.message}</p>
                                    </MyAlarmDescLayout>
                                    <MyAlarmTimeLayout>{item.createdAt}</MyAlarmTimeLayout>
                                </MyAlarmDescContainer>
                            </MyAlarmLayout>
                        </div>
                    );
                })}
            </MyAlarmContainer>
            {selectedAlarms.length > 0 && (
                <SelectedAlarmContainer>
                    <SelectedBtn onClick={removeSelectedAlarms}>선택한 알람 삭제</SelectedBtn>
                </SelectedAlarmContainer>
            )}
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
    z-index: -1;
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
`;

const MyAlarmLayout = styled.div`
    /* border: 1px solid black; */
    background-color: ${({ isRead }) => (isRead ? 'none' : '#fffaf1')};
    border-bottom: 1px solid #f0efed;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
    padding: 10px 10px 10px 0px;
`;

const MyAlarmProfileImg = styled.div`
    /* border: 1px solid black; */
    min-width: 70px;
    min-height: 70px;
    overflow: hidden;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 100%;
    margin: 0px 20px 0px 10px;
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

const SelectedAlarmContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;

const SelectedBtn = styled.button`
    width: 100%;
    height: 80px;
    border: none;
    background-color: #ff9900;
    color: white;
`;
