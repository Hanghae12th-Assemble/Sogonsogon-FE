import React, { useRef } from "react";
import { AiOutlineArrowUp, AiOutlineUser } from "react-icons/ai";
import { Link } from "react-router-dom";
import styled from "styled-components";

function RadionContainer(props) {
  const radioContainerRef = useRef();

  const topBtnHandler = () => {
    radioContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <>
      {props.radio && (
        <RadioContainer ref={radioContainerRef} f>
          {props.radio.map((item) => {
            return (
              <RadioLayout key={item.id}>
                <RadioImgContainer backgroundImageUrl={item.backgroundImageUrl}>
                  <ViewerCounterContainer>
                    <AiOutlineUser size={20} />
                    <ViewerCouterLayout>25명</ViewerCouterLayout>
                  </ViewerCounterContainer>
                </RadioImgContainer>
                <RadioTitleLayout>{item.title}</RadioTitleLayout>
                <RadioNameLayout>소곤이</RadioNameLayout>
              </RadioLayout>
            );
          })}
        </RadioContainer>
      )}
      <CreateRadioBtn to={"/createradio"}>방송하기</CreateRadioBtn>
      <TopBtn onClick={topBtnHandler}>
        <AiOutlineArrowUp size={15} />
      </TopBtn>
    </>
  );
}

export default RadionContainer;

const RadioImgContainer = styled.div`
  height: 150px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 15px;

  opacity: 0.9;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: flex-end;
  display: flex;
  flex-direction: row-reverse;
  transition: all 0.5s ease-in-out 0s;
  :hover {
    transform: scale(1.02);
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease-in-out 0s;
  }
`;

const RadioContainer = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 10px;
  flex-direction: row;
  padding: 30px 10px 0px 10px;
  z-index: -1;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.1em;
    height: 0.1em;
  }
`;

const RadioLayout = styled.div`
  /* border: 1px solid black; */
  width: 200px;
  min-height: 200px;
  margin: 20px auto;
`;

const ViewerCounterContainer = styled.div`
  background-color: green;
  width: 80px;
  height: 28px;
  color: white;
  margin: 0px 13px 10px 0px; //  위,오른쪽,아래,왼쪽
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ViewerCouterLayout = styled.div`
  min-width: 45px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioTitleLayout = styled.div`
  width: 150px;
  min-height: 25px;
  padding: 10px 0px 0px 0px;
  line-height: 1.5;
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;

  /* border: 1px solid black; */
`;

const RadioNameLayout = styled.div`
  width: 150px;
  min-height: 25px;
  padding: 10px 0px 0px 0px;
  font-size: 12px;
  padding-left: 5px;
  /* border: 1px solid black; */
`;

const CreateRadioBtn = styled(Link)`
  position: absolute;
  width: 444px;
  height: 50px;
  background-color: black;
  color: white;
  border-radius: 10px;
  font-size: 22px;
  bottom: 100px;
  left: 28px;
  z-index: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TopBtn = styled.button`
  position: absolute;
  width: 30px;
  height: 30px;
  background-color: #aaa6a6;
  color: black;
  border-radius: 100%;
  border: none;
  font-size: 22px;
  bottom: 165px;
  left: 440px;
  z-index: 900;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;
