import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import RadioInfobar from "../components/RadioInfobar";
import isLogin from "../util/checkCookie";
import { __enterAudio } from "../redux/module/enterAudio";

function RadioPreview() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { gettingRadio } = useSelector((state) => state);

  const getRadioData = gettingRadio?.radio?.map((item) =>
    item.data.result.map((i) => i)
  );

  const radioData = getRadioData?.map((item, i) =>
    item.find((i) => i.id === Number(id))
  );
  const foundRadio = radioData.filter((item) => {
    if (item !== undefined) {
      return item;
    }
  });

  const RadionEntranceHandler = () => {
    dispatch(__enterAudio(id));
    if (isLogin()) {
      document.startViewTransition(() => navigate(`/listen/${id}`));
    } else {
      alert("로그인이 필요한 서비스입니다.");
      navigate(-1);
    }
  };

  return (
    <>
      {foundRadio && (
        <>
          <RadioPreviewImgContainer
            backgroundImageUrl={foundRadio[0]?.backgroundImageUrl}
          >
            <RadioInfobar />
            <RadioPreviewPfContainer>
              <RadioPreviewProfileLayout>
                <RadioPreviewProfileImg />
                <RadioPreviewPfContentContainer>
                  {" "}
                  <RadioPreviewProfileNicknameLayout>
                    {foundRadio[0]?.nickname}
                  </RadioPreviewProfileNicknameLayout>
                </RadioPreviewPfContentContainer>
              </RadioPreviewProfileLayout>
            </RadioPreviewPfContainer>
          </RadioPreviewImgContainer>
          <RadioPreviewBottomContainer>
            <RadioPreviewBottomLayout>
              <RadioPreviewContentContainer>
                <RadioPreviewProfileTitleLayout>
                  {foundRadio[0]?.title}
                </RadioPreviewProfileTitleLayout>
                <LayoutContainer>
                  <div>{foundRadio[0]?.introduction}</div>
                </LayoutContainer>
              </RadioPreviewContentContainer>
              <JoinRadioBtn onClick={RadionEntranceHandler}>
                입장하기
              </JoinRadioBtn>
            </RadioPreviewBottomLayout>
          </RadioPreviewBottomContainer>
        </>
      )}
    </>
  );
}

export default RadioPreview;

const RadioPreviewImgContainer = styled.div`
  height: 100%;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RadioPreviewBottomContainer = styled.div`
  background-color: #010101;
  height: 75%;
  padding: 0px 25px;
  position: relative;
  align-items: flex-end;
  display: flex;
  flex-direction: column;
  z-index: 0;
`;

const RadioPreviewBottomLayout = styled.div`
  padding-top: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const RadioPreviewContentContainer = styled.div`
  background-color: #131312;
  width: 100%;
  min-height: 250px;
  color: white;
  border-radius: 15px;
  padding: 15px 20px 15px 20px;
  margin-bottom: 10px;
`;

const RadioPreviewProfileLayout = styled.div`
  /* border: 1px solid red; */
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100px;
`;

const RadioPreviewProfileImg = styled.div`
  min-width: 70px;
  min-height: 70px;
  overflow: hidden;
  position: relative;
  background-color: #ffffff;
  border-radius: 100%;
  margin-right: 20px;
  background-image: ${({ backgroundImageUrl }) => `url(${backgroundImageUrl})`};
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  align-items: flex-end;
  display: flex;
  flex-direction: row-reverse;
  transition: all 0.5s ease-in-out 0s;
  :hover {
    transform: scale(1.1);
    box-shadow: 0px 0px 3px 2px #ffffff;
    transition: all 0.3s ease-in-out 0s;
  }
`;

const RadioPreviewPfContentContainer = styled.div`
  width: 100%;
  min-height: 80px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const RadioPreviewProfileNicknameLayout = styled.div`
  width: 100%;
  color: white;
  min-height: 25px;
  font-size: 20px;
  font-weight: 80;
  display: flex;
  align-items: center;
`;

const RadioPreviewProfileTitleLayout = styled.div`
  width: 100%;
  min-height: 60px;
  font-size: 30px;
  display: flex;
  font-weight: bold;
  align-items: center;
  margin-bottom: 25px;
`;

const LayoutContainer = styled.div`
  background-color: #1e1e1d;
  padding: 15px;
  border-radius: 10px;
  width: 100%;
  min-height: 100px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const JoinRadioBtn = styled(Link)`
  margin: 0px 0px 30px 0px;
  width: 100%;
  height: 60px;
  background-color: #ff9900;
  font-weight: bold;
  color: white;
  border-radius: 10px;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RadioPreviewPfContainer = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: row;
  align-items: flex-end;
  padding: 0px 25px 0px 25px;
  background: linear-gradient(
    to top,
    #000000 10%,
    #0a0a0a 16%,
    #121212 20%,
    transparent 60%
  );
`;
