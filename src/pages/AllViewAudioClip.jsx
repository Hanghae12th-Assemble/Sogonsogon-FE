import React, { useRef } from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft, AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { ReactComponent as Order } from "../asset/icon/order.svg";
import { ReactComponent as LatestList } from "../asset/icon/latest.svg";
import ClipList from "../components/ClipList";
import SelectedContentRemoveBtn from "../components/SelectedContentRemoveBtn";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getClips, initInfinitiScroll } from "../redux/module/geClips";
import { useInView } from "react-intersection-observer";
import { __removeClip } from "../redux/module/removeClip";

function AllViewAudioClip() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { gettingClips, removingClip } = useSelector((state) => state);
  const page = useRef(1);
  const [ref, inView] = useInView();
  const [state, setState] = useState({
    editClicked: false,
    selectedContent: [],
    sortBy: "createdAt",
  });
  const { editClicked, selectedContent, sortBy } = state;
  useEffect(() => {
    page.current = 1;
    dispatch(initInfinitiScroll());
    dispatch(__getClips({ id, page: page.current, sortBy }));
  }, [sortBy, removingClip?.clip]);

  useEffect(() => {
    if (inView) {
      page.current += 1;
      dispatch(__getClips({ id, page: page.current, sortBy }));
    }
  }, [sortBy, inView]);

  const sortByLikesCoutHandler = () => {
    setState({ ...state, sortBy: "likesCount" });
  };
  const sortByCreatedAtHandler = () => {
    setState({ ...state, sortBy: "createdAt" });
  };

  const totalClipCount = gettingClips?.clip[0]?.data?.metadata?.audioClipCount;
  // const clipWriter = gettingClips?.clip[0]?.data.isMine

  return (
    <>
      <AllClipsNavBarBox>
        <AllClipsNavBarLeftLayout>
          <AiOutlineArrowLeft
            size={25}
            cursor={"pointer"}
            color="#283035"
            onClick={() => {
              document.startViewTransition(() => navigate(-1));
            }}
          />
          {/* <p>{albumTitle}</p> */}
        </AllClipsNavBarLeftLayout>
        {/* {clipWriter === user?.userName && */}
        <AiOutlinePlus
          size={25}
          cursor={"pointer"}
          color="#ff9900"
          onClick={() =>
            document.startViewTransition(() => navigate(`/createclip/${id}`))
          }
        />
      </AllClipsNavBarBox>
      <MyEditContainer>
        {!editClicked ? (
          <>
            <EditContainerLeftLayout>
              <StFrontSubstance>클립</StFrontSubstance>
              <StContentCount>{totalClipCount}</StContentCount>
            </EditContainerLeftLayout>
            {/* {clipWriter === user?.userName && */}
            <MyEditLayout
              onClick={() => {
                setState({ ...state, editClicked: true });
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
                setState({ editClicked: false, selectedContent: [] });
              }}
            >
              완료
            </MyDoneLayout>
          </>
        )}
      </MyEditContainer>
      <StSortBtnSvg>
        {sortBy === "likesCount" ? (
          <LatestList onClick={sortByCreatedAtHandler} />
        ) : (
          <Order onClick={sortByLikesCoutHandler} />
        )}
      </StSortBtnSvg>
      <AllClipsContainer>
        {gettingClips?.clip?.map((item) => {
          return item?.data?.result?.map((props, index) => {
            return (
              <ClipList
                key={index}
                data={props}
                editClicked={editClicked}
                selectedContent={selectedContent}
                state={state}
                setState={setState}
              />
            );
          });
        })}
        <div ref={ref}></div>
      </AllClipsContainer>
      <SelectedContentRemoveBtn
        state={state}
        setState={setState}
        selectedContent={selectedContent}
        __removeContent={__removeClip}
      />
    </>
  );
}

export default AllViewAudioClip;

const AllClipsNavBarBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0rem 1.875rem;
  min-height: 3.125rem;
  margin-top: 2.5rem;
  p {
    font-size: 1.25rem;
    font-weight: bold;
    margin-left: 0.625rem;
  }
`;

const AllClipsNavBarLeftLayout = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AllClipsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.625rem 0rem 0rem 0rem;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.1em;
    height: 0.1em;
  }
`;
const StSortBtnSvg = styled.div`
  cursor: pointer;
  width: 6.25rem;
  margin: 0.3125rem 0rem 0rem 1.875rem;
`;

const MyEditContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  min-height: 3.75rem;
  border-bottom: 0.0625rem solid #f0efed;
  padding: 0rem 1.875rem 0rem 1.875rem;
`;

const EditContainerLeftLayout = styled.div`
  display: flex;
  flex-direction: row;
  p {
    color: #a5a29c;
  }
`;

const MyEditLayout = styled.div`
  color: #a7a49e;
  cursor: pointer;
`;

const MyDoneLayout = styled(MyEditLayout)`
  color: #ff9900;
`;

const StFrontSubstance = styled.div`
  margin-right: 0.3125rem;
  color: black;
  font-weight: 600;
  font-size: 1.25rem;
`;

const StContentCount = styled.span`
  display: flex;
  align-items: center;
  font-size: 1.25rem;
  color: #ff9900;
`;

const StContentSlectedCount = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: 600;
`;
