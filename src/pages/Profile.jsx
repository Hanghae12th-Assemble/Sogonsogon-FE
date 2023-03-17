import React, { useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "../components/Navbar";
import styled from "styled-components";
//import { useForm } from "react-hook-form";
import Button from "../elements/Button";
import ProfileMidumContainer from "../components/ProfileMidumContainer";
import { useDispatch, useSelector } from "react-redux";
import { pageswitch } from "../redux/module/profileModifyButton";

function Profile() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  //   reset,
  // } = useForm();
  const dispatch = useDispatch();
  const selectBtn = useSelector((state) => state.profileButn);

  const onChangeimge = (e) => {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append("backgroundImageUrl", img);
    const reader = new FileReader();
    setFormformImagin(formImg);
    reader.onloadend = () => {
      setPreview(reader.result);
    };

    if (img) {
      reader.readAsDataURL(img);
    } else {
      setPreview("");
    }
  };

  const onPageClick = () => {
    dispatch(pageswitch(!selectBtn));
  };

  return (
    <ProfileContainer>
      <ProfileNavbarfixed>
        <Navbar
          toNavigate={"/"}
          iconleft={<AiOutlineArrowLeft size={20} />}
          title={"프로필"}
        />
      </ProfileNavbarfixed>
      <ProfileTop>
        <ProfileTopPhoto>사진</ProfileTopPhoto>
        <ProfileTopName>
          <span>이름</span>
        </ProfileTopName>
        <ProfileTopMbti>
          <span>MBTI</span>
        </ProfileTopMbti>
      </ProfileTop>
      {selectBtn ? (
        <>
          <div>
            <ProfileMidumInput>
              <span>닉네임</span>
              <ProfileMidumInputbox>
                <span>고은</span>
              </ProfileMidumInputbox>
            </ProfileMidumInput>
            {/* <ProfileMidumInput>
              <span>ID</span>
              <ProfileMidumInputbox>
                <span>Gosliver</span>
              </ProfileMidumInputbox>
            </ProfileMidumInput> */}
          </div>
          <ProfileBottom>
            <div>
              <ProfileBottomTitle>
                <span>자기소개</span>
              </ProfileBottomTitle>
              <ProfileBottomBox placeholder="자기소개를 해주세요." />
            </div>
          </ProfileBottom>
          <ProfileButtonSpanBox>
            <span>이미지</span>
            <ProfilePublicScopButton>
              <ProfileFileInput
                type="file"
                accept="image/*"
                onChange={onChangeimge}
              />
            </ProfilePublicScopButton>
          </ProfileButtonSpanBox>
          <ProfileBottomButton>
            <Button smBtn onClick={onPageClick}>
              취소
            </Button>
            <Button smBtn>완료</Button>
          </ProfileBottomButton>{" "}
        </>
      ) : (
        <ProfileMidumContainer />
      )}
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  padding: 0px 20px;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 0.5em;
    height: 0.5em;
  }
`;

const ProfileNavbarfixed = styled.div`
  //border: 1px solid black;
  background-color: white;
  position: fixed;
  width: 28.75rem; ;
`;

const ProfileTop = styled.div`
  //border: 1px solid black;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 80px;
`;

const ProfileTopPhoto = styled.div`
  border: 1px solid black;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileTopName = styled.div`
  margin-top: 20px;
`;

const ProfileTopMbti = styled.div`
  border: 1px solid black;
  width: 80px;
  height: 34px;
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const ProfileMidumInput = styled.div`
  margin-bottom: 50px;
`;

const ProfileMidumInputbox = styled.div`
  width: 460px;
  height: 3rem;
  border-radius: 0.625rem;
  border: none;
  background-color: #f1f2f6;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 10px;
  margin-top: 20px;
`;

const ProfileBottom = styled.div`
  //border: 1px solid black;
  margin-top: 50px;
`;

const ProfileBottomTitle = styled.div`
  margin-bottom: 20px;
`;

const ProfileBottomBox = styled.textarea`
  //border: 1px solid black;
  width: 460px;
  height: 118px;
  border-radius: 10px;
  padding: 10px;
  resize: none;
`;

const ProfileBottomButton = styled.div`
  //border: 1px solid blue;
  padding: 20px;
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
`;

const ProfileButtonSpanBox = styled.div`
  //border: 1px solid black;
  margin-top: 40px;
`;

const ProfilePublicScopButton = styled.div`
  margin-top: 10px;
  //border: 1px solid black;
`;

const ProfileFileInput = styled.input`
  margin-bottom: 30px;
  ::file-selector-button {
    width: 370px;
    height: 48px;
    background: #f1f2f6;
    border-radius: 10px;
    border: none;
    font-weight: bold;
    cursor: pointer;
    &:hover {
      background-color: #262626;
      color: white;
    }
  }
`;
