import React from 'react'
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import MyContentEditContainer from '../components/MyContentEditContainer';
import { useState } from 'react';
import { ReactComponent as Latest } from '../asset/icon/latestlist.svg';
import ClipList from '../components/ClipList';
import SelectedContentRemoveBtn from "../components/SelectedContentRemoveBtn"
import { useNavigate } from 'react-router-dom';

function AllViewAudioClip() {
    const navigate = useNavigate()
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
                        onClick={() => {
                            document.startViewTransition(() => navigate(-1));
                        }}
                    />
                    <p>좋은 음악을 같이 들어요.</p>
                </AllClipsNavBarLeftLayout>
                <AiOutlinePlus
                    size={25}
                    cursor={'pointer'}
                    color='#ff9900'
                    onClick={() => {
                        document.startViewTransition(() => navigate("/createclip"));
                    }}
                />
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
                <ClipList
                    editClicked={editClicked}
                    selectedContent={selectedContent}
                    state={state}
                    setState={setState}
                />
            </AllClipsContainer>
            <SelectedContentRemoveBtn
                state={state}
                setState={setState}
                selectedContent={selectedContent}
            // __removeContent={__removeAlarm}
            />

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

const StLatestSvg = styled(Latest)`
    width: 20px;
    height: 20px;
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

