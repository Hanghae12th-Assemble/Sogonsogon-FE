import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { __getAlarm } from '../redux/module/getAlarm';
import { __readAlarm } from '../redux/module/readAlarm';
import { __removeAlarm } from '../redux/module/removeAlarm';
import Navbar from '../components/Navbar';
import { AiOutlineArrowLeft, AiOutlineSync } from 'react-icons/ai';
import styled from 'styled-components';
import MyContentEditContainer from '../components/MyContentEditContainer';
import SelectBtnContainer from '../components/SelectBtnContainer';
import SelectedContentRemoveBtn from '../components/SelectedContentRemoveBtn';



function MyAlarm() {
    const { gettingAlarm, readingAlarm, removingAlarm } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [state, setState] = useState({
        editClicked: false,
        selectedContent: [],
    });

    const { editClicked, selectedContent } = state;

    useEffect(() => {
        dispatch(__getAlarm());
    }, [readingAlarm, removingAlarm]);

    const unReadAlarm = gettingAlarm?.alarm?.data?.filter((alarm) => alarm.readStatus !== true);

    const unReadAlarmHandler = () => {
        if (unReadAlarm?.length > 0) {
            unReadAlarm?.forEach((alarm) => {
                dispatch(__readAlarm(alarm.notificationId));
            });
        }
    };
    return (
        <>
            {gettingAlarm && (
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
                    <MyContentEditContainer
                        editClicked={editClicked}
                        contentType={unReadAlarm}
                        selectedContent={selectedContent}
                        substance={"개의 안 읽은 알람이 있습니다."}
                        setEditClicked={(value) => setState({ ...state, editClicked: value })}
                    />
                    <MyAlarmContainer>
                        {gettingAlarm?.alarm?.data?.map((item) => {
                            return (
                                <div key={item.notificationId}>
                                    <MyAlarmLayout isRead={item.readStatus}>
                                        <SelectBtnContainer
                                            editClicked={editClicked}
                                            state={state}
                                            setState={setState}
                                            selectedContent={selectedContent}
                                            contentId={item.notificationId}
                                        />

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
                    <SelectedContentRemoveBtn
                        state={state}
                        setState={setState}
                        selectedContent={selectedContent}
                        __removeContent={__removeAlarm}
                    />
                </>
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
    overflow: auto;

    ::-webkit-scrollbar {
        width: 0.1em;
        height: 0.1em;
    }
`;

const MyAlarmLayout = styled.div`
    /* border: 1px solid black; */
    width:500px;
    background-color: ${({ isRead }) => (isRead ? 'none' : '#fffaf1')};
    border-top: 1px solid #f0efed;
    display: flex;
    flex-direction: row;
    align-items: center;
    min-height: 100px;
    padding: 10px 30px 10px 20px;
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



