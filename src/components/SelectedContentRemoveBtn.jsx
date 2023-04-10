import React from 'react'
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

function SelectedContentRemoveBtn({ setState, selectedContent, __removeContent }) {
    const dispatch = useDispatch();
    const removeSelectedContent = () => {
        selectedContent.forEach((contentId) => {
            dispatch(__removeContent(contentId));
        });
        setState({ editClicked: false, selectedContent: [] });
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
    )
}

export default SelectedContentRemoveBtn

const SelectedContentContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
`;


const SelectedBtn = styled.button`
    width: 100%;
    height: 80px;
    font-size: 18px;
    border: none;
    background-color: #ff9900;
    color: white;
    cursor: pointer;
`;
