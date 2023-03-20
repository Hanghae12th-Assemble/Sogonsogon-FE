import React, { useRef } from "react";
import { AiOutlineArrowUp, AiOutlineEye, AiOutlineUser } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../elements/Button";
import useScroll from "../hooks/useScroll";

function RadioContainer(props) {
  const radioContainerRef = useRef();
  const navigate = useNavigate();
  const scrollPos = useScroll(radioContainerRef);
  const topBtnHandler = () => {
    radioContainerRef.current.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {props.radio && (
        <StRadioContainer ref={radioContainerRef}>
          {props.radio.map((item) => {
            return (
              <RadioLayout key={item.id}>
                <RadioImgContainer
                  onClick={() => {
                    document.startViewTransition(() =>
                      navigate(`radiopreview/${item.id}`)
                    );
                  }}
                  style={{ backgroundImage: `url(${item.backgroundImageUrl})` }}
                >
                  <ViewerCounterContainer>
                    <AiOutlineUser size={20} />
                    <ViewerCouterLayout>25명</ViewerCouterLayout>
                  </ViewerCounterContainer>
                </RadioImgContainer>
                <RadioContentLayout>
                  <RadionContentMiniLayout>
                    <RadioTitleLayout to={`/radiopreview/${item.id}`}>
                      {item.title}
                    </RadioTitleLayout>

                    <RadioNameLayout>소곤이</RadioNameLayout>
                  </RadionContentMiniLayout>

                  <HitsContainer>
                    <HitsLayout>
                      <AiOutlineEye size={25} />
                      30
                    </HitsLayout>
                  </HitsContainer>
                </RadioContentLayout>
              </RadioLayout>
            );
          })}
        </StRadioContainer>
      )}
      {scrollPos > 10 && (
        <Button TopBtn onClick={topBtnHandler}>
          <AiOutlineArrowUp size={15} />
        </Button>
      )}
    </>
  );
}

export default RadioContainer;

const RadioImgContainer = styled.div`
  min-height: 150px;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 15px;
  opacity: 0.9;
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

const StRadioContainer = styled.div`
  position: relative;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, 2fr);
  grid-gap: 10px;
  flex-direction: row;
  padding: 0px 10px 0px 10px;
  z-index: -1;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.1em;
    height: 0.1em;
  }
`;

const RadioLayout = styled.div`
  width: 200px;
  min-height: 200px;
  margin: 10px auto;
`;

const ViewerCounterContainer = styled.div`
  background-color: #6d6d6d;
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

const RadioContentLayout = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* border: 1px solid black; */
`;

const RadioTitleLayout = styled(Link)`
  font-size: 15px;
  font-weight: bold;
  padding-left: 5px;
  line-height: 1.5;
  /* border: 1px solid black; */
`;

const RadioNameLayout = styled.div`
  width: 145px;
  min-height: 20px;
  padding: 5px 0px 0px 0px;
  font-size: 12px;
  padding-left: 5px;
  color: #6d6d6d;
  /* border: 1px solid black; */
`;

const HitsContainer = styled.div`
  width: 48px;
  min-height: 50px;
  /* border: 1px solid black; */
`;
const HitsLayout = styled.div`
  width: fit-content;
  height: fit-content;
  font-size: 15px;
  display: flex;
  align-items: center;
  color: #6d6d6d;
  /* border: 1px solid black; */
`;

const RadionContentMiniLayout = styled.div`
  width: 150px;
  min-height: 50px;
  /* border: 1px solid black; */
`;
