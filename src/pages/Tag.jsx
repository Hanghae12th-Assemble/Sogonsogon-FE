import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  __getCategoryRadio,
  initInfinitiScroll,
} from "../redux/module/getRadioCategory";
import { useDispatch, useSelector } from "react-redux";
import { useInView } from "react-intersection-observer";
import RadioContainer from "../components/RadioContainer";
import Navbar from "../components/Navbar";
import {
  AiOutlineArrowUp,
  AiOutlineMenu,
  AiOutlinePlus,
  AiOutlineSearch,
} from "react-icons/ai";
import Lnb from "../components/Lnb";
import useScroll from "../hooks/useScroll";
import Button from "../elements/Button";
import styled from "styled-components";
import { NavbarContainer } from "../pages/Home";
import RadioCountContainer from "../components/RadioCountContainer";
import { ReactComponent as Music } from "../asset/icon/music.svg";
import { ReactComponent as Daily } from "../asset/icon/daily.svg";
import { ReactComponent as Book } from "../asset/icon/book.svg";
import { ReactComponent as Asmr } from "../asset/icon/asmr.svg";

function Tag() {
  let { id } = useParams();
  const page = useRef(1);
  const radioContainerRef = useRef();
  const [ref, inView] = useInView();
  const dispatch = useDispatch();
  const data = useSelector((state) => state.gettingRadioCategory);
  const [isLnbOpen, setIsLnbOpen] = useState(false);
  const scrollPos = useScroll(radioContainerRef);
  const navigate = useNavigate();

  const toggleLnb = () => setIsLnbOpen((prev) => !prev);
  useEffect(() => {
    page.current = 1;
    dispatch(initInfinitiScroll());
    dispatch(__getCategoryRadio({ categoryType: id, page: page.current }));
  }, [id]);

  useEffect(() => {
    if (inView) {
      page.current += 1;
      dispatch(__getCategoryRadio({ categoryType: id, page: page.current }));
    }
  }, [inView]);

  const renderIcon = () => {
    switch (id) {
      case "음악":
        return (
          <IconStyle>
            <Music />
          </IconStyle>
        );
      case "일상":
        return (
          <IconStyle>
            <Daily />
          </IconStyle>
        );
      case "도서":
        return (
          <IconStyle>
            <Book />
          </IconStyle>
        );
      case "ASMR":
        return (
          <IconStyle>
            <Asmr />
          </IconStyle>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
      <NavbarContainer>
        <Navbar
          iconleft={<AiOutlineMenu size={30} onClick={toggleLnb} />}
          title={id}
          icon={renderIcon()}
          iconright={<AiOutlineSearch size={30} />}
          toClose={"/search"}
        />
      </NavbarContainer>
      <RadioCountContainer props={data} />
      <StRadioContainer ref={radioContainerRef}>
        {data?.radio.map((item, index) => {
          return item?.data?.result?.map((props, index) => {
            return <RadioContainer props={props} key={index} />;
          });
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
          <AiOutlineArrowUp size={15} />
        </Button>
      )}

      <Button
        AddRadioBtn
        onClick={() => {
          document.startViewTransition(() => navigate("/createradio"));
        }}
      >
        <AiOutlinePlus size={20} />
      </Button>
    </>
  );
}

export default Tag;

const StRadioContainer = styled.div`
  //border: 1px solid black;
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  flex-direction: row;
  padding: 0px 20px;
  z-index: -1;
  overflow: auto;
`;

const IconStyle = styled.div`
  svg {
    width: 20px;
  }
`;
