import React from "react";
import styled from "styled-components";
import SelectBtnContainer from "./SelectBtnContainer";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Music } from "../asset/icon/music.svg";
import { ReactComponent as Daily } from "../asset/icon/daily.svg";
import { ReactComponent as Book } from "../asset/icon/book.svg";
import { ReactComponent as Asmr } from "../asset/icon/asmr.svg";

function AlbumList({ editClicked, state, setState, selectedContent, data }) {
  const navigate = useNavigate();
  const dateTime = data?.createdAt?.slice(0, 10).replace(/-/g, ".");
  const renderIcon = (categoryType) => {
    switch (categoryType) {
      case "음악":
        return (
          <StIconSvg>
            <Music />
          </StIconSvg>
        );
      case "일상":
        return (
          <StIconSvg>
            <Daily />
          </StIconSvg>
        );
      case "도서":
        return (
          <StIconSvg>
            <Book />
          </StIconSvg>
        );
      case "ASMR":
        return (
          <StIconSvg>
            <Asmr />
          </StIconSvg>
        );
      default:
        return null;
    }
  };
  return (
    <>
      <MyAlbumLayout>
        <MyAlbumDescContainer>
          <SelectBtnContainer
            editClicked={editClicked}
            state={state}
            setState={setState}
            selectedContent={selectedContent}
            contentId={data?.id}
          />
          <MyAlbumOnclickdiv
            onClick={() => {
              document.startViewTransition(() =>
                navigate(`/albumdetail/${data?.id}`)
              );
            }}
          >
            <MyAlbumImg backgroundImageUrl={data?.backgroundImageUrl} />
            <MyAlbumDescLayout>
              <MyAlbumTitleLayout>{data?.title}</MyAlbumTitleLayout>
              <MyAlbumDateLayout>{dateTime}</MyAlbumDateLayout>
              <MyAlbumHeartContianer>
                {data?.likeCheck === true ? <StAiFillHeart size={18} /> : <StAiOutlineHeart size={18} />}
                <div>{data?.likesCount}</div>
              </MyAlbumHeartContianer>
            </MyAlbumDescLayout>
          </MyAlbumOnclickdiv>
        </MyAlbumDescContainer>
        {renderIcon(data?.categoryType)}
      </MyAlbumLayout>
    </>
  );
}

export default AlbumList;

const MyAlbumLayout = styled.div`
  border-bottom: 0.0625rem solid ${({ theme }) => theme.color.softGray_col};
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  min-height: 8.75rem;
  padding: 2.0313rem 1.875rem 0.625rem 1.25rem;
`;
const MyAlbumDescContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const MyAlbumOnclickdiv = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
`;

const MyAlbumImg = styled.div`
  min-width: 4.6875rem;
  max-height: 4.6875rem;
  position: relative;
  background-color: ${({ theme }) => theme.color.softGray_col};
  border-radius: 0.625rem;
  margin: 0rem 1.25rem 0rem 0.625rem;
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

const MyAlbumDescLayout = styled.div`
  min-height: 4.6875rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const MyAlbumHeartContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    margin-left: 0.3125rem;
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.color.darkGray_col};
  }
`;
const MyAlbumTitleLayout = styled.div`
  font-size: 1.25rem;
  font-weight: 500;
`;
const MyAlbumDateLayout = styled.div`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.color.darkGray_col};
  margin: 0.5rem 0rem 0.625rem 0rem;
`;
const StIconSvg = styled.div`
  width: 1.875rem;
`;

const StAiOutlineHeart = styled(AiOutlineHeart)`
  color: ${({ theme }) => theme.color.darkGray_col};
  margin-right: 0.3125rem;
`;

const StAiFillHeart = styled(AiFillHeart)`
  color: ${({ theme }) => theme.color.orange_col};
  margin-right: 0.3125rem;
`;
