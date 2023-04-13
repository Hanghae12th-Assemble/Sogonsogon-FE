import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";

function SelectedContentRemoveBtn({
  setState,
  selectedContent,
  __removeContent,
}) {
  const dispatch = useDispatch();
  const removeSelectedContent = () => {
    if (
      window.confirm(
        "정말로 삭제 하시겠습니까? 확인시 모든 데이터가 삭제 됩니다."
      )
    ) {
      selectedContent.forEach((contentId) => {
        dispatch(__removeContent(contentId));
      });
      setState({ editClicked: false, selectedContent: [] });
    } else {
    }
  };

  return (
    <>
      {selectedContent.length > 0 && (
        <SelectedContentContainer>
          <SelectedBtn onClick={removeSelectedContent}>
            삭제 {selectedContent?.length}
          </SelectedBtn>
        </SelectedContentContainer>
      )}
    </>
  );
}

export default SelectedContentRemoveBtn;

const SelectedContentContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 0.625rem;
`;

const SelectedBtn = styled.button`
  width: 100%;
  height: 5rem;
  font-size: 1.125rem;
  border: none;
  background-color:  ${({ theme }) => theme.color.orange_col};
  color: ${({ theme }) => theme.color.white_col};
  cursor: pointer;
`;
