import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import {
  AiFillHeart,
  AiOutlineArrowLeft,
  AiOutlineDown,
  AiOutlineHeart,
  AiOutlinePlus,
  AiOutlineRight,
  AiOutlineUp,
} from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
import { NavbarContainer } from "./Home";
import styled from "styled-components";
import { ReactComponent as Edit } from "../asset/icon/edit.svg";
import Button from "../elements/Button";
import ClipList from "../components/ClipList";
import { useDispatch, useSelector } from "react-redux";
import { __getAlbumDetail } from "../redux/module/getAlbumDetail";
import { __likeAlbum } from "../redux/module/likeAlbum";
import { useThrottledCallback } from "../hooks/useThrottledCallback";
import isLogin from "../util/checkCookie";

function AlbumDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gettingAlbumDetail, likingAlbum } = useSelector((state) => state);
  const formattedDate = gettingAlbumDetail?.album?.data?.result?.createdAt
    ?.slice(0, 10)
    .replace(/-/g, ".");

  const [state, setState] = useState({
    editClicked: false,
    selectedContent: [],
    expanded: true,
  });

  const { editClicked, selectedContent, expanded } = state;

  useEffect(() => {
    dispatch(__getAlbumDetail(id));
    if (isLogin() === false) {
      alert("로그인부터 해주세요.");
      navigate("/selectlogin");
    }
  }, [id, likingAlbum, dispatch, navigate]);

  const handleClick = () => {
    setState({ ...state, expanded: !expanded });
  };

  const albumLike = useThrottledCallback(
    () => {
      dispatch(__likeAlbum(id));
    },
    1000,
    [dispatch, id]
  );

  if (gettingAlbumDetail?.isLoading) {
    return null
  }

  return (
    <>
      <NavbarContainer>
        <Navbar
          toNavigate={-1}
          iconleft={<AiOutlineArrowLeft size={30} />}
          title={""}
          iconright={
            gettingAlbumDetail?.album?.data?.result?.mine === true ? (
              <StEditSvg />
            ) : null
          }
          toClose={`/modifyaudio/${id}`}
        />
      </NavbarContainer>
      <AlbumDetailPgContainer>
        <AlbumDetailPgDescContainer>
          <AlbumDetailPgImg backgroundImageUrl={gettingAlbumDetail?.album?.data?.result?.backgroundImageUrl}></AlbumDetailPgImg>
          <AlbumDetailPgDescLayout>
            <AlbumDetailPgTitleLayout>
              {gettingAlbumDetail?.album?.data?.result?.title}
            </AlbumDetailPgTitleLayout>
            <AlbumDetailPgNameLayout
              onClick={() => {
                document.startViewTransition(() =>
                  navigate(
                    `/profile/${gettingAlbumDetail?.album?.data?.result?.memberName}`
                  )
                );
              }}
            >
              {" "}
              <p>
                {gettingAlbumDetail?.album?.data?.result?.meberNickname}
              </p>{" "}
              <AiOutlineRight />{" "}
            </AlbumDetailPgNameLayout>
            <AlbumDetailPgDateLayout>{formattedDate}</AlbumDetailPgDateLayout>
            <AlbumDetailPgHeartContianer>
              {gettingAlbumDetail?.album?.data?.result?.likeCheck === true ? (
                <StAiFillHeart size={20} onClick={albumLike} />
              ) : (
                <StAiOutlineHeart size={20} onClick={albumLike} />
              )}
              <div>{gettingAlbumDetail?.album?.data?.result?.likesCount}</div>
            </AlbumDetailPgHeartContianer>
            {gettingAlbumDetail?.album?.data?.result?.mine === true ? (
              <Button
                AddRadioBtn
                onClick={() => {
                  document.startViewTransition(() =>
                    navigate(
                      `/createclip/${gettingAlbumDetail?.album?.data?.result?.id}`
                    )
                  );
                }}
              >
                <AiOutlinePlus size={20} />
              </Button>
            ) : null}
          </AlbumDetailPgDescLayout>
          <AlbumDetailPgIntroContainer expanded={expanded}>
            <p>앨범 소개</p>
            <span>{gettingAlbumDetail?.album?.data?.result?.instruction}</span>
            {gettingAlbumDetail?.album?.data?.result?.instruction?.length >
              84 && (
                <ExpandButtonContainer onClick={handleClick}>
                  {expanded ? (
                    <>
                      <div>펼쳐보기</div> <AiOutlineDown />
                    </>
                  ) : (
                    <>
                      <div>접기</div>
                      <AiOutlineUp />
                    </>
                  )}
                </ExpandButtonContainer>
              )}
          </AlbumDetailPgIntroContainer>
        </AlbumDetailPgDescContainer>
        <AlbumDetailPgClipInfo>
          <ClipInfoLeftLayout>
            <ClipInfoLeftSubstance>클립</ClipInfoLeftSubstance>
            <StContentCount>
              {gettingAlbumDetail?.album?.data?.metadata?.audioClipCount}
            </StContentCount>
          </ClipInfoLeftLayout>
          <StAllViewLayout
            onClick={() => {
              document.startViewTransition(() => navigate(`/allclips/${id}`));
            }}
          >
            모두보기
          </StAllViewLayout>
        </AlbumDetailPgClipInfo>
        {gettingAlbumDetail?.album?.data?.result?.audioClips?.map(
          (item, index) => {
            return (
              <ClipList
                key={index}
                data={item}
                editClicked={editClicked}
                selectedContent={selectedContent}
                state={state}
                setState={setState}
              />
            );
          }
        )}
      </AlbumDetailPgContainer>
    </>
  );
}

export default AlbumDetail;

const StEditSvg = styled(Edit)`
  width: 1.875rem;
`;

const AlbumDetailPgContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
`;

const AlbumDetailPgDescContainer = styled.div`
  width: 100%;
  min-height: ${(props) => (props.expanded ? "520px" : "auto")};
  padding: 0.9375rem 2.1875rem 0rem 2.1875rem;
`;
const AlbumDetailPgImg = styled.div`
  width: 13.125rem;
  height: 13.125rem;
  background-color: ${({ theme }) => theme.color.softBlack_col};
  border-radius: 0.625rem;
  margin: auto;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: flex-end;
  display: flex;
  flex-direction: row-reverse;
  :hover {
    transform: scale(1);
    box-shadow: 0rem 0rem 0.3125rem 0.125rem rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const AlbumDetailPgDescLayout = styled.div`
  position: relative;
  margin-top: 1.5625rem;
  width: 100%;
`;
const AlbumDetailPgTitleLayout = styled.div`
  width: 100%;
  font-size: 1.25rem;
  font-weight: bold;
`;
const AlbumDetailPgNameLayout = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  margin: 0.6875rem 0rem;
  p {
    margin-right: 0.1875rem;
  }
`;

const AlbumDetailPgDateLayout = styled.div`
  width: fit-content;
  font-size: 0.9375rem;
  margin-bottom: 0.6875rem;
  color: ${({ theme }) => theme.color.darkGray_col};
`;
const AlbumDetailPgHeartContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  div {
    margin-left: 0.3125rem;
    font-size: 0.9375rem;
    color: ${({ theme }) => theme.color.darkGray_col};
  }
`;

const AlbumDetailPgIntroContainer = styled.div`
  width: 100%;
  min-height: 8.125rem;
  margin-top: 1.25rem;
  border-radius: 0.625rem;
  padding: 1.25rem;
  background-color: ${({ theme }) => theme.color.darkWhite_col};
  display: flex;
  flex-direction: column;
  & > span {
    height: ${(props) => (props.expanded ? "auto" : "100px")};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.expanded ? "3" : "")};
    -webkit-box-orient: vertical;
    font-size: 1rem;
    line-height: 1.375rem;
    color: ${({ theme }) => theme.color.darkGray_col};
  }
  p {
    font-size: 1.0625rem;
    font-weight: bold;
    margin-bottom: 0.625rem;
  }
`;
const ExpandButtonContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 0.9375rem;
  width: fit-content;
  margin: 0.4375rem auto auto auto;
  background-color: transparent;
  color: ${({ theme }) => theme.color.darkGray_col};
  cursor: pointer;
  div {
    margin-right: 0.4375rem;
  }
`;

const AlbumDetailPgClipInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.25rem;
  width: 100%;
  min-height: 3.75rem;
  padding: 0rem 2.1875rem 0rem 2.1875rem;
`;

const ClipInfoLeftLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const ClipInfoLeftSubstance = styled.div`
  margin-right: 0.3125rem;
  font-weight: bold;
  font-size: 1.25rem;
`;
const StContentCount = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: ${({ theme }) => theme.color.orange_col};
`;
const StAllViewLayout = styled.span`
  color: ${({ theme }) => theme.color.darkGray_col};
  cursor: pointer;
`;

const StAiFillHeart = styled(AiFillHeart)`
  color: ${({ theme }) => theme.color.orange_col};
  cursor: pointer;
`;

const StAiOutlineHeart = styled(AiOutlineHeart)`
  color: ${({ theme }) => theme.color.darkGray_col};
  cursor: pointer;
`;
