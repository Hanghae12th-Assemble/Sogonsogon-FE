import React, { useEffect, useRef, useState } from "react";
import Lnb from "../components/Lnb";
import Navbar from "../components/Navbar";
import { NavbarContainer } from "./Home";
import { AiOutlineMenu, AiOutlinePlus } from "react-icons/ai";
import MyContentEditContainer from "../components/MyContentEditContainer";
import styled from "styled-components";
import SelectedContentRemoveBtn from "../components/SelectedContentRemoveBtn";
import { useDispatch, useSelector } from "react-redux";
import { __getMyAlbum, initInfinitiScroll } from "../redux/module/getMyAlbum";
import { useInView } from "react-intersection-observer";
import AlbumList from "../components/AlbumList";
import { __removeAlbum } from "../redux/module/removeAlbum";

function MyAlbum() {
  const [isLnbOpen, setIsLnbOpen] = useState(false);
  const [state, setState] = useState({
    editClicked: false,
    selectedContent: [],
  });
  const toggleLnb = () => setIsLnbOpen((prev) => !prev);
  const dispatch = useDispatch();
  const { gettingMyAlbum, removingMyAlbum } = useSelector((state) => state);
  const page = useRef(1);
  const [ref, inView] = useInView();

  useEffect(() => {
    page.current = 1;
    dispatch(initInfinitiScroll());
    dispatch(__getMyAlbum(page.current));
  }, [removingMyAlbum]);

  useEffect(() => {
    if (inView) {
      page.current += 1;
      dispatch(__getMyAlbum(page.current));
    }
  }, [inView]);

  const { editClicked, selectedContent } = state;
  const totalAlbumCount =
    gettingMyAlbum?.album[0]?.data?.metadata?.audioAlbumCount;
  const allAlbumDataID = gettingMyAlbum?.album?.map((item) => {
    return item?.data?.result?.map((content) => content.id);
  });
  return (
    <>
      <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
      <NavbarContainer>
        <Navbar
          iconleft={<AiOutlineMenu size={30} onClick={toggleLnb} />}
          title={"내 앨범"}
          iconright={<AiOutlinePlus size={30} />}
          toClose={"/createaudio"}
        />
      </NavbarContainer>
      <MyContentEditContainer
        editClicked={editClicked}
        contentType={totalAlbumCount}
        selectedContent={selectedContent}
        frontSubstance={"전체 앨범"}
        state={state}
        setState={setState}
        dataId={allAlbumDataID[0]}
        __removeContent={__removeAlbum}
      />
      <MyAlbumContainer>
        {gettingMyAlbum?.album?.map((item) => {
          return item?.data?.result?.map((props, index) => {
            return (
              <AlbumList
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
      </MyAlbumContainer>
      <SelectedContentRemoveBtn
        state={state}
        setState={setState}
        selectedContent={selectedContent}
        __removeContent={__removeAlbum}
      />
    </>
  );
}

export default MyAlbum;

const MyAlbumContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
`;
