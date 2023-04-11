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

function AlbumDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gettingAlbumDetail, likingAlbum } = useSelector((state) => state);
  const formattedDate =
    gettingAlbumDetail?.album?.data?.result?.createdAt?.substr(0, 10);
  const [state, setState] = useState({
    editClicked: false,
    selectedContent: [],
    expanded: true,
  });

  useEffect(() => {
    dispatch(__getAlbumDetail(id));
  }, [likingAlbum]);

  const { editClicked, selectedContent, expanded } = state;

  const handleClick = () => {
    setState({ ...state, expanded: !expanded });
  };

  return (
    <>
      <NavbarContainer>
        <Navbar
          toNavigate={-1}
          iconleft={<AiOutlineArrowLeft size={25} />}
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
          <AlbumDetailPgImg
            backgroundImageUrl={
              gettingAlbumDetail?.album?.data?.result?.backgroundImageUrl
            }
          />
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
                <AiFillHeart
                  size={20}
                  color={"ff9900"}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(__likeAlbum(id));
                  }}
                />
              ) : (
                <AiOutlineHeart
                  size={20}
                  color={"77756f"}
                  cursor={"pointer"}
                  onClick={() => {
                    dispatch(__likeAlbum(id));
                  }}
                />
              )}
              <div>106</div>
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
              3 && (
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
            <StContentCount>15</StContentCount>
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
  width: 25px;
`;

const AlbumDetailPgContainer = styled.div`
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
`;

const AlbumDetailPgDescContainer = styled.div`
  /* border: 1px solid black; */

  width: 100%;
  min-height: ${(props) => (props.expanded ? "520px" : "auto")};
  padding: 15px 35px 0px 35px;
`;
const AlbumDetailPgImg = styled.div`
  width: 210px;
  height: 210px;
  background-color: #393b3a6e;
  border-radius: 10px;
  margin: auto;
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
`;

const AlbumDetailPgDescLayout = styled.div`
  /* border: 1px solid black; */
  position: relative;
  margin-top: 25px;
  width: 100%;
`;
const AlbumDetailPgTitleLayout = styled.div`
  width: 100%;
  font-size: 20px;
  font-weight: bold;
`;
const AlbumDetailPgNameLayout = styled.div`
  cursor: pointer;
  width: fit-content;
  display: flex;
  align-items: center;
  margin: 11px 0px;
  p {
    margin-right: 3px;
  }
`;

const AlbumDetailPgDateLayout = styled.div`
  width: fit-content;
  font-size: 15px;
  margin-bottom: 11px;
  color: #77756f;
`;
const AlbumDetailPgHeartContianer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: fit-content;
  div {
    margin-left: 5px;
    font-size: 15px;
    color: #77756f;
  }
`;

const AlbumDetailPgIntroContainer = styled.div`
  width: 100%;
  min-height: 130px;
  margin-top: 20px;
  border-radius: 10px;
  padding: 20px;
  background-color: #f8f7f6;
  display: flex;
  flex-direction: column;
  & > span {
    height: ${(props) => (props.expanded ? "auto" : "100px")};
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.expanded ? "3" : "")};
    -webkit-box-orient: vertical;
    font-size: 16px;
    line-height: 22px;
    color: #77756f;
  }
  p {
    font-size: 17px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`;
const ExpandButtonContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 17px;
  width: fit-content;
  margin: 7px auto auto auto;
  background-color: transparent;
  color: #77756f;
  cursor: pointer;
  div {
    margin-right: 7px;
  }
`;

const AlbumDetailPgClipInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  min-height: 60px;
  padding: 0px 35px 0px 35px;
`;

const ClipInfoLeftLayout = styled.div`
  display: flex;
  flex-direction: row;
`;

const ClipInfoLeftSubstance = styled.div`
  margin-right: 5px;
  color: black;
  font-weight: 600;
  font-size: 20px;
`;
const StContentCount = styled.span`
  display: flex;
  align-items: center;
  font-size: 20px;
  color: #ff9900;
`;
const StAllViewLayout = styled.span`
  color: #77756f;
  cursor: pointer;
`;
