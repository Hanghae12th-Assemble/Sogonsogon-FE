import React from 'react'
import styled from 'styled-components'
import SelectBtnContainer from '../components/SelectBtnContainer';
import { AiOutlineHeart } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Edit } from "../asset/icon/edit.svg";


function ClipList({ editClicked, state, setState, selectedContent, data }) {
    const navigate = useNavigate()
    const dateTime = data?.createdAt?.replace("T", " ").slice(0, 16);

    return (
        <>
            <AllClipsLayout>
                <AllClipsInfoContainer>
                    <AllClipsEpisodeLayout>{data?.order}회차</AllClipsEpisodeLayout>
                </AllClipsInfoContainer>
                <AllClicpsDescContainer>
                    <SelectBtnContainer
                        editClicked={editClicked}
                        state={state}
                        setState={setState}
                        selectedContent={selectedContent}
                        contentId={data?.id}
                    />
                    {!editClicked ? (
                        <><AllCilpsMiniBox />
                            <AllClipsDotted />
                            <AllClipsDottedLine />
                            <AllClipsDotted2 />

                        </>
                    ) : <StEditSvg onClick={() => {
                        document.startViewTransition(() => navigate(`/modifyclip/${data?.id}`))
                    }} />

                    }
                    <AudioCilpImg backgroundImageUrl={data?.audioclipImageUrl} />
                    <AllClicpsDescLayout onClick={() => {
                        document.startViewTransition(() => navigate(`/clipplay/${data?.id}`));
                    }}>
                        <AllClicpsTitleLayout>{data?.title}</AllClicpsTitleLayout>
                        <AllClicpsHeartContianer>
                            <div>{dateTime}</div>
                            <AiOutlineHeart size={16} color={"77756f"} style={{ marginRight: "5px" }} />
                            <div>{data?.isLikeCount}</div>
                        </AllClicpsHeartContianer>
                    </AllClicpsDescLayout>
                </AllClicpsDescContainer>

            </AllClipsLayout>

        </>
    )
}

export default ClipList


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
    position: relative;
    background-color: #393b3a6e;
    border-radius: 10px;
    margin: 0px 15px 0px 15px;
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
    cursor: pointer;
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
        margin: 0px 7px 0px 0px;
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
const AllClipsEpisodeLayout = styled.div`
    width: fit-content;
    height: fit-content;
    padding: 4px 6px;
    border-radius: 13px;
    display: flex;
    align-items: center;
    font-size: 13px;
    color: #ff9900;
    background-color: #fff5e3;
`
const StEditSvg = styled(Edit)`
  width: 28px;
  position: absolute;
  right: 25px;
  top: 52px;
  cursor: pointer;
  stroke: #ff9900;
`;