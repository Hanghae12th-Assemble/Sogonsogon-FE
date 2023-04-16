import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAlarm } from "../redux/module/getAlarm";
import { __removeAlarm } from "../redux/module/removeAlarm";
import Navbar from "../components/Navbar";
import { AiOutlineArrowLeft, AiOutlineSync } from "react-icons/ai";
import styled from "styled-components";
import MyContentEditContainer from "../components/MyContentEditContainer";
import SelectedContentRemoveBtn from "../components/SelectedContentRemoveBtn";
import AlarmList from "../components/AlarmList";

function MyAlarm() {
  const { gettingAlarm, removingAlarm } = useSelector(
    (state) => state
  );
  const dispatch = useDispatch();
  const [state, setState] = useState({
    editClicked: false,
    selectedContent: [],
  });

  const { editClicked, selectedContent } = state;

  useEffect(() => {
    dispatch(__getAlarm());
  }, [removingAlarm]);

  const unReadAlarm = gettingAlarm?.alarm?.filter(
    (alarm) => alarm.readStatus !== true
  );

  const allAlarmDataID = gettingAlarm?.alarm?.map((item) => item.notificationId)
  return (
    <>
      {gettingAlarm && (
        <>
          <NavbarContainer>
            <Navbar
              toNavigate={"/"}
              iconleft={
                <AiOutlineArrowLeft size={25} />
              }
              title={"알림"}
              iconright={
                <AiOutlineSync
                  size={25}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(__getAlarm());
                  }}
                />
              }
            />
          </NavbarContainer>
          <MyContentEditContainer
            editClicked={editClicked}
            contentType={unReadAlarm?.length}
            selectedContent={selectedContent}
            substance={"개의 알림이 있습니다."}
            state={state}
            setState={setState}
            dataId={allAlarmDataID}
            __removeContent={__removeAlarm}
          />
          <MyAlarmContainer>
            {gettingAlarm?.alarm?.map((item, index) => {
              return (
                <AlarmList
                  key={item.notificationId}
                  data={item}
                  state={state}
                  setState={setState}
                  editClicked={editClicked}
                  selectedContent={selectedContent}
                />
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
  padding: 0rem 1.25rem;
`;

const MyAlarmContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
`;
