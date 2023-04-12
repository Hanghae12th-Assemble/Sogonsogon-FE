import React from "react";
import styled from "styled-components";
import SelectBtnContainer from "../components/SelectBtnContainer";
import { AiOutlineHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Edit } from "../asset/icon/edit.svg";

function ClipList({ editClicked, state, setState, selectedContent, data }) {
  const navigate = useNavigate();
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
            <>
              <AllCilpsMiniBox />
              <AllClipsDotted />
              <AllClipsDottedLine />
              <AllClipsDotted2 />
            </>
          ) : (
            <StEditSvg
              onClick={() => {
                document.startViewTransition(() =>
                  navigate(`/modifyclip/${data?.id}`)
                );
              }}
            />
          )}
          <AudioCilpImg backgroundImageUrl={data?.audioclipImageUrl} />
          <AllClicpsDescLayout
            onClick={() => {
              document.startViewTransition(() =>
                navigate(`/clipplay/${data?.id}`)
              );
            }}
          >
            <AllClicpsTitleLayout>{data?.title}</AllClicpsTitleLayout>
            <AllClicpsHeartContianer>
              <div>{dateTime}</div>
              <StAiOutlineHeart size={16} />
              <div>{data?.isLikeCount}</div>
            </AllClicpsHeartContianer>
          </AllClicpsDescLayout>
        </AllClicpsDescContainer>
      </AllClipsLayout>
    </>
  );
}

export default ClipList;

const AllClipsLayout = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  min-height: 8.75rem;
  padding: 0.625rem 1.25rem 0.625rem 0.625rem;
`;

const AudioCilpImg = styled.div`
  min-width: 4.6875rem;
  max-height: 4.6875rem;
  position: relative;
  background-color: #393b3a6e;
  border-radius: 0.625rem;
  margin: 0rem 0.9375rem 0rem 0.9375rem;
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

const AllClipsInfoContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0rem 0rem 0.3125rem 3.4375rem;
`;

const AllClicpsDescContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0rem 0rem 0rem 0.3125rem;
`;

const AllClicpsDescLayout = styled.div`
  cursor: pointer;
  min-height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const AllClicpsTitleLayout = styled.div`
  line-height: 1.4375rem;
  font-size: 1.125rem;
  font-weight: 550;
`;

const AllClicpsHeartContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 0.625rem;

  div {
    margin: 0rem 0.4375rem 0rem 0rem;
    font-size: 1.0625rem;
    color: #77756f;
  }
`;

const AllClipsDottedLine = styled.div`
  position: absolute;
  left: 2.1875rem;
  top: 1.25rem;
  width: 0.0625rem;
  height: 8.75rem;
  border: 0.0625rem dotted #77756f;
`;

const AllClipsDotted = styled.div`
  position: absolute;
  top: 1rem;
  left: 2.0625rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 100%;
  background-color: #77756f;
`;

const AllClipsDotted2 = styled.div`
  position: absolute;
  top: 9.75rem;
  left: 2.0625rem;
  width: 0.375rem;
  height: 0.375rem;
  border-radius: 100%;
  background-color: #77756f;
`;

const AllCilpsMiniBox = styled.div`
  min-width: 2.1875rem;
`;

const AllClipsEpisodeLayout = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.25rem 0.375rem;
  border-radius: 0.8125rem;
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  color: #ff9900;
  background-color: #fff5e3;
`;

const StEditSvg = styled(Edit)`
  width: 1.75rem;
  position: absolute;
  right: 1.5625rem;
  top: 3.25rem;
  cursor: pointer;
  stroke: #ff9900;
`;

const StAiOutlineHeart = styled(AiOutlineHeart)`
  color: #77756f;
  margin-right: 5px;
`