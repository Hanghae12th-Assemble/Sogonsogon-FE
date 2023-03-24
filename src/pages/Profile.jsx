import React, { useEffect, useState } from "react";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "../components/Navbar";
import styled from "styled-components";
//import { useForm } from "react-hook-form";
import Button from "../elements/Button";
import ProfileMidumContainer from "../components/ProfileMidumContainer";
import { useDispatch, useSelector } from "react-redux";
import { __updateProfile } from "../redux/module/updateProfile";
import { pageswitch } from "../redux/module/reduxState/profileModifyButton";
import Input from "../elements/Input";
import { useForm } from "react-hook-form";
import { getLocalStorage } from "../util/localStorage";
import { __getProfile } from "../redux/module/getProfile";

function Profile() {
  const [formImagin, setFormformImagin] = useState(new FormData());
  const [preview, setPreview] = useState("");
  const { id } = JSON.parse(getLocalStorage("userInfo"));
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const selectBtn = useSelector((state) => state.profileButn);
  const getUserInfo = useSelector((state) => state?.gettingProfile?.profile);
  const userInfo = useSelector((state) => state?.updatingProfile?.profile);

  const onChangeimge = (e) => {
    const img = e.target.files[0];
    const formImg = new FormData();
    formImg.append("profileImageUrl", img);
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

  const submitForm = (data) => {
    const formData = new FormData();
    formData.append("nickname", data.nickname);
    formData.append("memberInfo", data.memberInfo);
    for (const keyValue of formImagin) {
      formData.append(keyValue[0], keyValue[1]);
    }

    dispatch(__updateProfile({ userId: id, profileInfo: formData }));
    dispatch(pageswitch(!selectBtn));
    reset();
  };

  const onPageClick = () => {
    dispatch(pageswitch(!selectBtn));
    setPreview("");
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
        <ProfileTopPhoto>
          {preview ? (
            <div>
              <ProfileImg src={preview} alt="Preview" />
            </div>
          ) : (
            <ProfileImg src={getUserInfo?.profileImageUrl} alt="Preview" />
          )}
        </ProfileTopPhoto>
        <ProfileTopName>
          <ProfileTopnicknameMembername>
            <ProfileTopMembername>
              {userInfo?.membername
                ? userInfo?.membername
                : getUserInfo?.membername}
            </ProfileTopMembername>
          </ProfileTopnicknameMembername>
          <ProfileTopnicknameMembername>
            <span>
              @{userInfo?.nickname ? userInfo?.nickname : getUserInfo?.nickname}
            </span>
          </ProfileTopnicknameMembername>
        </ProfileTopName>
      </ProfileTop>
      {selectBtn ? (
        <form onSubmit={handleSubmit(submitForm)}>
          <div>
            <ProfileMidumInput>
              <span>닉네임</span>
              <ProfileMidumInputbox>
                <Input
                  register={register}
                  type={"text"}
                  name={"nickname"}
                  placeholder={"닉네임을 입력해주세요."}
                  validation={{
                    required: "닉네임을 입력해주세요.",
                  }}
                />
              </ProfileMidumInputbox>
            </ProfileMidumInput>
          </div>
          <ProfileBottom>
            <div>
              <ProfileBottomTitle>
                <span>자기소개</span>
              </ProfileBottomTitle>
              <Input
                textarea
                asFor={"textarea"}
                register={register}
                type={"text"}
                name={"memberInfo"}
                placeholder={"자기소개를 입력해주세요."}
                validation={{
                  required: "자기소개를 입력해주세요.",
                }}
              />
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
          </ProfileBottomButton>
        </form>
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
  height: 200px;
  display: flex;
  align-items: center;
  margin-top: 80px;
`;

const ProfileTopPhoto = styled.div`
  //border: 1px solid black;
  border-radius: 50%;
  width: 120px;
  height: 120px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
`;

const ProfileTopnicknameMembername = styled.div`
  margin-bottom: 10px;
  margin-left: 10px;
  position: relative;
  bottom: 10px;
`;

const ProfileTopMembername = styled.span`
  font-size: 20px;
  font-weight: bolder;
`;

const ProfileTopName = styled.div`
  //border: 1px solid red;
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
