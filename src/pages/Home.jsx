import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { __getRadio } from "../redux/module/getRadio";
import styled from "styled-components";

function Home() {
  const radio = {
    data: [
      {
        id: 1,
        title: "라디오1",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 2,
        title: "라디오2",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 3,
        title: "라디오3",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 4,
        title: "라디오4",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 5,
        title: "라디오5",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 6,
        title: "라디오6",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 7,
        title: "라디오7",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
      {
        id: 8,
        title: "라디오8",
        backgroundImageUrl:
          "https://cdn.pixabay.com/photo/2022/10/04/14/27/cat-7498364_960_720.jpg",
      },
    ],
  };

  console.log(radio);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(__getRadio());
  }, [dispatch]);

  // const { isLoading, error, radio } = useSelector((state) => {
  //     return state.gettingRadio;
  // });

  // console.log('radio.data', radio?.data);
  return (
    <>
      {radio?.data && (
        <RadioContainer>
          {radio.data.map((item) => {
            return (
              <RadioLayout key={item.id}>
                <ItemsImgContainer backgroundImageUrl={item.backgroundImageUrl}>
                  <ViewerCounterContainer>12명</ViewerCounterContainer>
                  {/* <img src={item.backgroundImageUrl} alt="" /> */}
                </ItemsImgContainer>
                <div>{item.title}</div>
              </RadioLayout>
            );
          })}
        </RadioContainer>
      )}
    </>
  );
}

export default Home;

const ItemsImgContainer = styled.div`
  height: 150px;
  overflow: hidden;
  position: relative;
  background-color: #f5f5f5;
  border-radius: 1rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  opacity: 0.9;
  z-index: -1;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  align-items: flex-end;
  display: flex;
  flex-direction: row-reverse;
  :hover {
    transform: scale(1.05);
    box-shadow: 0px 0px 10px 2px rgba(0, 0, 0, 0.3);
  }
`;

const RadioContainer = styled.div`
  border: 1px solid black;
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  flex-wrap: wrap;
`;
const RadioLayout = styled.div`
  border: 1px solid black;
  width: 220px;
  height: 200px;
  margin: 10px auto;
`;

const ViewerCounterContainer = styled.div`
  background-color: green;
  width: 70px;
  height: 30px;
  color: white;
  margin: 0px 13px 10px 0px; //  위,오른쪽,아래,왼쪽
  border-radius: 15px;
`;
