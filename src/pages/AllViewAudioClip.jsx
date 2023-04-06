import React from 'react'
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlineComment, AiOutlineHeart, AiOutlinePlus } from 'react-icons/ai';
import MyContentEditContainer from '../components/MyContentEditContainer';
import { useState } from 'react';
import SelectBtnContainer from '../components/SelectBtnContainer';
import { ReactComponent as Latest } from '../asset/icon/latestlist.svg';
function AllViewAudioClip() {
    const [state, setState] = useState({
        editClicked: false,
        selectedContent: [],
    });

    const { editClicked, selectedContent } = state;

    const totalClipCount = [1, 2, 3, 4, 5, 6]

    return (
        <>
            <AllClipsNavBarBox>
                <AllClipsNavBarLeftLayout>
                    <AiOutlineArrowLeft
                        size={25}
                        cursor={'pointer'}
                        color="#283035"
                    />
                    <p>좋은 음악을 같이 들어요.</p>
                </AllClipsNavBarLeftLayout>
                <AiOutlinePlus
                    size={25}
                    cursor={'pointer'}
                    color='#ff9900' />
            </AllClipsNavBarBox>
            <MyContentEditContainer
                editClicked={editClicked}
                contentType={totalClipCount}
                selectedContent={selectedContent}
                frontSubstance={"클립"}
                setEditClicked={(value) => setState({ ...state, editClicked: value })}
            />
            <AllClipsListBtnContainer><StLatestSvg />최신순</AllClipsListBtnContainer>
            <AllClipsContainer>
                <AllClipsLayout>
                    <AllClipsInfoContainer>
                        <div>6회차</div>
                        <div>오늘</div>
                    </AllClipsInfoContainer>
                    <AllClicpsDescContainer>
                        <SelectBtnContainer
                            editClicked={editClicked}
                            state={state}
                            setState={setState}
                            selectedContent={selectedContent}
                        // contentId={item.notificationId}
                        />
                        {!editClicked && (
                            <><AllCilpsMiniBox />
                                <AllClipsDotted />
                                <AllClipsDottedLine />
                                <AllClipsDotted2 />

                            </>
                        )

                        }
                        <AudioCilpImg />
                        <AllClicpsDescLayout>
                            <AllClicpsTitleLayout>오늘은 비가 오네요. 비오는 날 어울리는 노래 들려드려요.</AllClicpsTitleLayout>
                            <AllClicpsHeartContianer>
                                <AiOutlineHeart size={19} color={"77756f"} />
                                <div>106</div>
                                <AiOutlineComment size={19} color={"77756f"} />
                                <div>33 </div>
                            </AllClicpsHeartContianer>
                        </AllClicpsDescLayout>
                    </AllClicpsDescContainer>
                </AllClipsLayout>
            </AllClipsContainer>
        </>
    )
}

export default AllViewAudioClip

const AllClipsNavBarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0px 30px;
  min-height: 3.125rem;
  margin-top: 2.5rem;
  p {
    font-size: 20px;
    font-weight: bold;
    margin-left: 10px;
  }
`;

const AllClipsNavBarLeftLayout = styled.div`
    display: flex;
  flex-direction: row;
  align-items: center;
`

const AllClipsContainer = styled.div`
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
`
const AllClipsLayout = styled.div`
     position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    min-height: 140px;
    padding: 10px 20px 10px 10px;
`

const AudioCilpImg = styled.div`
    min-width: 75px;
    max-height: 75px;
    overflow: hidden;
    position: relative;
    background-color: #393b3a6e;
    border-radius: 10px;
    margin: 0px 15px 0px 15px;
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
`

const AllClipsInfoContainer = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0px 0px 5px 55px;
`

const AllClicpsDescContainer = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px 0px 0px 5px;
`

const AllClicpsDescLayout = styled.div`
    min-height: 80px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const AllClicpsTitleLayout = styled.div`
    line-height: 23px;
    font-size: 18px;
    font-weight: 550;
`

const AllClicpsHeartContianer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 10px;

    div{
        margin: 0px 10px 0px 5px;
        font-size: 17px;
        color: #77756f;
    }
`

const AllClipsDottedLine = styled.div`
    position: absolute;
    left: 35px;
    top: 20px;
    width: 1px;
    height: 140px;
    border: 1px dotted #77756f;
`
const AllClipsDotted = styled.div`
    position: absolute;
    top: 16px;
    left: 33px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color:#77756f ;
`
const AllClipsDotted2 = styled.div`
    position: absolute;
    top: 156px;
    left: 33px;
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background-color:#77756f ;
`

const AllCilpsMiniBox = styled.div`
    min-width: 35px;
`
const StLatestSvg = styled(Latest)`
    width: 20px;
    height: 20px;
    color: red;
`
const AllClipsListBtnContainer = styled.div`
    display: flex;
    align-items: center;
    width: fit-content;
    height: fit-content;
    background-color:#ff9900;
    color: white;
    border-radius: 3px;
    padding: 6px 12px;
    margin: 5px 0px 20px 30px;
    cursor: pointer;
`