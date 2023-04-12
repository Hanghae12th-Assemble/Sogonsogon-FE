import React from "react";
import { ReactComponent as NotFound } from "../asset/icon/notfound.svg";
import { ReactComponent as Logo } from "../asset/logo/logo.svg";
import Navbar from "../components/Navbar";
import { AiOutlineMenu, AiOutlineSearch } from "react-icons/ai";
import { useState } from "react";
import Lnb from "../components/Lnb";
import styled from "styled-components";

function Notfound() {
  const [isLnbOpen, setIsLnbOpen] = useState(false);
  const toggleLnb = () => setIsLnbOpen((prev) => !prev);

  return (
    <NotFoundContainer>
      <Lnb isOpen={isLnbOpen} handleItemClick={toggleLnb} />
      <Navbar
        iconleft={<AiOutlineMenu size={30} onClick={toggleLnb} />}
        title={<Logo />}
        iconright={<AiOutlineSearch size={30} />}
        toClose={"/search"}
      />
      <NotFoundBoxMiddle>
        <div>
          <NotFound />
        </div>
        <NotFoundTitle>
          <h1>죄송합니다.</h1>
          <h1>페이지를 찾을 수 없습니다.</h1>
        </NotFoundTitle>
        <NotFoundPtag>
          <p>
            입력한 주소가 잘못되었거나, 사용이 일시 중단되어 <br />
            요청하신 페이지를 찾을 수 없습니다. <br />
            서비스 이용에 불편을 드려 죄송합니다.
          </p>
        </NotFoundPtag>
      </NotFoundBoxMiddle>
    </NotFoundContainer>
  );
}

export default Notfound;

const NotFoundContainer = styled.div`
  height: 100%;
  padding: 0rem 1.25rem;
`;

const NotFoundBoxMiddle = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 9.375rem;
`;

const NotFoundTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 1.875rem;
`;

const NotFoundPtag = styled.div`
  color: #999999;
  margin-top: 1.875rem;
  p {
    text-align: center;
    line-height: 1.5625rem;
  }
`;
