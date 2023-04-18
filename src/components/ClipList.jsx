import React from "react";
import styled from "styled-components";
import SelectBtnContainer from "../components/SelectBtnContainer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Edit } from "../asset/icon/edit.svg";

function ClipList({ editClicked, state, setState, selectedContent, data }) {
  const navigate = useNavigate();
  const dateTime = data?.createdAt?.slice(0, 10).replace(/-/g, ".");

  return (
    <>
      <AllClipsLayout>
        <AllClicpsDescContainer>
          <AllClipsInfoContainer>
            {editClicked ? <LayoutBox /> : null}
            <AllClipsEpisodeLayout>No.{data?.order}</AllClipsEpisodeLayout>
          </AllClipsInfoContainer>
          <AllClipDescLayout>
            <SelectBtnContainer
              editClicked={editClicked}
              state={state}
              setState={setState}
              selectedContent={selectedContent}
              contentId={data?.id}
            />
            {!editClicked ? (null) : (
              <StEditSvg
                onClick={() => {
                  document.startViewTransition(() =>
                    navigate(`/modifyclip/${data?.id}`)
                  );
                }}
              />
            )}
            <AudioCilpImg backgroundImageUrl={data?.audioclipImageUrl}
              onClick={() => {
                document.startViewTransition(() =>
                  navigate(`/clipplay/${data?.id}`)
                );
              }}
            />
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
                {data?.likeCheck === true ? (
                  <StAiFillHeart size={16} />
                ) : (
                  <StAiOutlineHeart size={16} />
                )}
                <div>{data?.isLikeCount}</div>
              </AllClicpsHeartContianer>
            </AllClicpsDescLayout>
          </AllClipDescLayout>
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
  cursor: pointer;
  position: relative;
  background-color: ${({ theme }) => theme.color.darkGray_col};
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
  margin: 0rem 0rem 0.3125rem 0rem;
`;

const AllClicpsDescContainer = styled.div`
  display: flex;
  flex-direction: column;
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
    color: ${({ theme }) => theme.color.darkGray_col};
  }
`;

const AllClipsEpisodeLayout = styled.div`
  width: fit-content;
  height: fit-content;
  padding: 0.25rem 0.375rem;
  margin: 0rem 0rem 0rem .9375rem;
  border-radius: 0.8125rem;
  display: flex;
  align-items: center;
  font-size: 0.8125rem;
  font-weight: bold;
  color: ${({ theme }) => theme.color.orange_col};
  background-color: ${({ theme }) => theme.color.coolOrange_col};
`;

const StEditSvg = styled(Edit)`
  width: 1.75rem;
  position: absolute;
  right: 1.5625rem;
  top: 3.25rem;
  cursor: pointer;
  stroke: ${({ theme }) => theme.color.orange_col};
`;

const StAiOutlineHeart = styled(AiOutlineHeart)`
  color: ${({ theme }) => theme.color.darkGray_col};
  margin-right: 0.3125rem;
`;

const StAiFillHeart = styled(AiFillHeart)`
  color: ${({ theme }) => theme.color.orange_col};
  margin-right: 0.3125rem;
`;

const AllClipDescLayout = styled.div`
  display: flex;
  flex-direction: row;

`
const LayoutBox = styled.div`
  width: 2.125rem;
  height: .625rem
`

