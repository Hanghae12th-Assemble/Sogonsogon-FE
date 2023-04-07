import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getAlbum } from "../redux/module/getAlbum";
import Navbar from "../components/Navbar";
import {
  AiOutlineArrowUp,
  AiOutlineMenu,
  AiOutlineSearch,
} from "react-icons/ai";
import Lnb from "../components/Lnb";
import RadioContainer from "../components/RadioContainer";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import useScroll from "../hooks/useScroll";
import { useInView } from "react-intersection-observer";
import { initInfinitiScroll } from "../redux/module/getAlbum";
import RadioCountContainer from "../components/RadioCountContainer";
import { ReactComponent as Logo } from "../asset/logo/logo.svg";

function Home() {
  const [isLnbOpen, setIsLnbOpen] = useState(false);
  const data = useSelector((state) => state.gettingAlbum);
  const page = useRef(1);
  const [ref, inView] = useInView();
  const radioContainerRef = useRef();
  const scrollPos = useScroll(radioContainerRef);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    page.current = 1;
    dispatch(initInfinitiScroll());
    dispatch(__getAlbum(page.current));
  }, []);

  useEffect(() => {
    if (inView) {
      page.current += 1;
      dispatch(__getAlbum(page.current));
    }
  }, [inView]);

  const toggleLnb = () => setIsLnbOpen((prev) => !prev);

  return (
    <>
      <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
      <NavbarContainer>
        <Navbar
          iconleft={<AiOutlineMenu size={30} onClick={toggleLnb} />}
          title={<HomeLogo />}
          iconright={<AiOutlineSearch size={30} />}
          toClose={"/search"}
        />
      </NavbarContainer>
      <RadioCountContainer props={data} />
      <StRadioContainer ref={radioContainerRef}>
        {data?.album?.map((item) => {
          return item?.data?.result?.map((props, index) => {
            return <RadioContainer props={props} key={index} />;
          })

        })}
        <div ref={ref}></div>
      </StRadioContainer>
      {scrollPos > 500 && (
        <Button
          TopBtn
          onClick={() =>
            radioContainerRef.current.scrollTo({ top: 0, behavior: "smooth" })
          }
        >
          <AiOutlineArrowUp size={20} />
        </Button>
      )}
    </>
  );
}

export default Home;

export const NavbarContainer = styled.div`
  padding: 0px 20px;
`;

export const StRadioContainer = styled.div`
  /* border: 1px solid black; */
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  flex-direction: row;
  padding: 0px 20px;
  overflow: auto;
`;

const HomeLogo = styled(Logo)`
  //border: 1px solid black;
  width: 130px;
`;
