import React from "react";
import styled from "styled-components";
import SelectBtnContainer from "./SelectBtnContainer";

function AlarmList({ state, setState, editClicked, selectedContent, data }) {
  return (
    <>
      <MyAlarmLayout isRead={data.readStatus}>
        <SelectBtnContainer
          editClicked={editClicked}
          state={state}
          setState={setState}
          selectedContent={selectedContent}
          contentId={data?.notificationId}
        />

        <MyAlarmProfileImg backgroundImageUrl={data?.senderProfileImageUrl} />
        <MyAlarmDescContainer>
          <MyAlarmDescLayout>
            <p>{data?.message}</p>
          </MyAlarmDescLayout>
          <MyAlarmTimeLayout>{data?.createdAt}</MyAlarmTimeLayout>
        </MyAlarmDescContainer>
      </MyAlarmLayout>
    </>
  );
}

export default AlarmList;

const MyAlarmLayout = styled.div`
  width: 500px;
  background-color: ${({ isRead }) => (isRead ? "none" : "#fffaf1")};
  border-bottom: 1px solid #f0efed;
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 100px;
  padding: 10px 30px 10px 20px;
`;

const MyAlarmProfileImg = styled.div`
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
  transition: all 0.5s ease-in-out 0s;
  :hover {
    transform: scale(1);
    box-shadow: 0px 0px 5px 2px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const MyAlarmDescContainer = styled.div`
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
