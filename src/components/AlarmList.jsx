import React from "react";
import styled from "styled-components";
import SelectBtnContainer from "./SelectBtnContainer";

function AlarmList({ state, setState, editClicked, selectedContent, data }) {
  return (
    <>
      <MyAlarmLayout>
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
  width: 31.25rem;
  background-color: ${({ theme }) => theme.color.white_col};
  border-bottom: 0.0625rem solid ${({ theme }) => theme.color.softGray_col};
  display: flex;
  flex-direction: row;
  align-items: center;
  min-height: 6.25rem;
  padding: 0.625rem 1.875rem 0.625rem 1.25rem;
`;

const MyAlarmProfileImg = styled.div`
  min-width: 4.375rem;
  min-height: 4.375rem;
  overflow: hidden;
  position: relative;
  background-color: ${({ theme }) => theme.color.softGray_col};
  border-radius: 100%;
  margin: 0rem 1.25rem 0rem 0.625rem;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  transition: all 0.5s ease-in-out 0s;
  :hover {
    transform: scale(1);
    box-shadow: 0rem 0rem 0.3125rem 0.125rem rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const MyAlarmDescContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MyAlarmDescLayout = styled.div`
  min-height: 3.4375rem;
  display: flex;
  align-items: center;
  line-height: 1.1875rem;
  font-size: 1rem;
  font-weight: 500;
`;
const MyAlarmTimeLayout = styled.div`
  font-size: 0.9rem;
  color: ${({ theme }) => theme.color.gray_col};
`;
