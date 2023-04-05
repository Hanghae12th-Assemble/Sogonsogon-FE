import React from 'react'
import styled from 'styled-components';
import { AiOutlineArrowLeft, AiOutlinePlus } from 'react-icons/ai';
import MyContentEditContainer from '../components/MyContentEditContainer';
import { useState } from 'react';
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
                        color="#a7a49e"
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