import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

function MyContentEditContainer({
  editClicked,
  contentType,
  selectedContent,
  substance,
  frontSubstance,
  state,
  setState,
  dataId,
  __removeContent,
}) {
  const dispatch = useDispatch();
  const AllContentRomoveHandler = (dataId) => {
    if (
      window.confirm("정말로 삭제 하시겠습니까? 확인시 모든 데이터가 삭제 됩니다.")
    ) {
      dataId.map((id) => {
        dispatch(__removeContent(id));
      })
    } else {
    }
  };
  return (
    <>
      <MyEditContainer>
        {!editClicked ? (
          <>
            <EditContainerLeftLayout>
              <StFrontSubstance frontSubstance={frontSubstance}>
                {frontSubstance}
              </StFrontSubstance>
              <StContentCount frontSubstance={frontSubstance}>
                {contentType}
              </StContentCount>
              <p>{substance}</p>
            </EditContainerLeftLayout>
            <MyEditLayout
              onClick={() => {
                setState({ ...state, editClicked: true });
              }}
            >
              편집
            </MyEditLayout>
          </>
        ) : (
          <>
            <StContentSlectedCount>
              <p>{selectedContent?.length}</p>개 선택
              <div onClick={() => AllContentRomoveHandler(dataId)}>전체삭제</div>
            </StContentSlectedCount>
            <MyDoneLayout
              onClick={() => {
                setState({ editClicked: false, selectedContent: [] });
              }}
            >
              완료
            </MyDoneLayout>
          </>
        )}
      </MyEditContainer>
    </>
  );
}

export default MyContentEditContainer;

const MyEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 3.75rem;
  border-bottom: 0.0625rem solid ${({ theme }) => theme.color.softGray_col};
  padding: 0rem 1.875rem 0rem 1.875rem;
`;

const EditContainerLeftLayout = styled.div`
  display: flex;
  flex-direction: row;
  p {
    color: ${({ theme }) => theme.color.darkGray_col};
  }
`;

const MyEditLayout = styled.div`
  color:${({ theme }) => theme.color.orange_col};
  cursor: pointer;
`;

const MyDoneLayout = styled.div`
  color: ${({ theme }) => theme.color.orange_col};
  cursor: pointer;
`;

const StFrontSubstance = styled.div`
  margin-right: 0.3125rem;
  color: ${({ theme }) => theme.color.softBlack_col};
  font-weight: 600;
  font-size: ${({ frontSubstance }) =>
    frontSubstance === "클립" ? "1.25rem" : "1rem"};
`;

const StContentCount = styled.span`
  display: flex;
  align-items: center;
  font-size: ${({ frontSubstance }) =>
    frontSubstance === "클립" ? "1.25rem" : "1rem"};
  color: ${({ frontSubstance }) => (frontSubstance ? "#ff9900" : "#262524")};
`;

const StContentSlectedCount = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
  div{
    margin-left: 20px;
    font-size: 16px;
    cursor: pointer;
    color: ${({ theme }) => theme.color.orange_col};
  }
`;