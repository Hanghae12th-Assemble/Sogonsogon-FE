import React from 'react'
import styled from 'styled-components';

function MyContentEditContainer({ editClicked, contentType, selectedContent, substance, frontSubstance, state, setState }) {
    return (
        <>
            <MyEditContainer>
                {!editClicked ? (
                    <>
                        <EditContainerLeftLayout>
                            <StFrontSubstance frontSubstance={frontSubstance}>{frontSubstance}</StFrontSubstance>
                            <StContentCount frontSubstance={frontSubstance}>{contentType}</StContentCount>
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
    )
}

export default MyContentEditContainer


const MyEditContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    min-height: 60px;
    /* border-bottom: 1px solid #f0efed; */
    padding: 0px 30px 0px 30px;
   
`;

const EditContainerLeftLayout = styled.div`
    display: flex;  
    flex-direction: row;
    p {
        color: #a5a29c;
    }
`

const MyEditLayout = styled.div`
    color: #a7a49e;
    cursor: pointer;
`;

const MyDoneLayout = styled.div`
    color: #ff9900;
    cursor: pointer;
`

const StFrontSubstance = styled.div`
    margin-right: 5px;
    color: black;
    font-weight: 600;
    font-size : ${({ frontSubstance }) => (frontSubstance === "클립" ? "20px" : "16px")};
`

const StContentCount = styled.span`
    display: flex;
    align-items: center;
    font-size : ${({ frontSubstance }) => (frontSubstance === "클립" ? "20px" : "16px")};
    color : ${({ frontSubstance }) => (frontSubstance ? '#ff9900' : 'black')};
`

const StContentSlectedCount = styled.div`
    display: flex;  
    flex-direction: row;
    font-weight: 600;
`