import React from 'react'
import styled from 'styled-components';

function MyContentEditContainer({ editClicked, contentType, selectedContent, setEditClicked, substance, frontSubstance }) {
    return (
        <>
            <MyEditContainer>
                {!editClicked ? (
                    <>
                        <EditContainerLeftLayout>
                            <StFrontSubstance>{frontSubstance}</StFrontSubstance>
                            <StContentCount frontSubstance={frontSubstance}>{contentType?.length}</StContentCount>
                            <p>{substance}</p>
                        </EditContainerLeftLayout>

                        <MyEditLayout
                            onClick={() => {
                                setEditClicked(true);
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
                                setEditClicked(false);
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
    border-bottom: 1px solid #f0efed;
    padding: 0px 30px 0px 35px;
   
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
`

const StContentCount = styled.span`
    font-size: 17px;
    color : ${({ frontSubstance }) => (frontSubstance ? '#ff9900' : 'black')};
`

const StContentSlectedCount = styled.div`
display: flex;  
    flex-direction: row;
    font-weight: 600;
`