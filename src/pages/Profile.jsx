import React from "react";
import { useDispatch } from "react-redux";
import { __userFollow } from "../redux/module/userFollow";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Navbar from "../components/Navbar";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Input from "../elements/Input";

function Profile() {
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const followBtn = () => {
    dispatch(__userFollow());
  };

  return (
    <ProfileContainer>
      <Navbar
        toNavigate={"/"}
        iconleft={<AiOutlineArrowLeft size={20} />}
        title={"프로필"}
      />
      <ProfileTop>
        <ProfileTopPhoto>사진</ProfileTopPhoto>
        <ProfileTopName>
          <span>이름</span>
        </ProfileTopName>
        <ProfileTopMbti>
          <span>MBTI</span>
        </ProfileTopMbti>
        <ProfileTopFollow>
          <ProfileTopFollower>
            <span>팔로워</span>
            <span>88</span>
          </ProfileTopFollower>
          <ProfileTopFollowing>
            <span>팔로잉</span>
            <span>87</span>
          </ProfileTopFollowing>
        </ProfileTopFollow>
      </ProfileTop>
      <button onClick={followBtn}>팔로우하기</button>
      <ProfileMidum>
        <ProfileMidumInput>
          <span>닉네임</span>
          <ProfileMidumInputbox>
            <span>고은</span>
          </ProfileMidumInputbox>
        </ProfileMidumInput>
        <ProfileMidumInput>
          <span>ID</span>
          <ProfileMidumInputbox>
            <span>Gosliver</span>
          </ProfileMidumInputbox>
        </ProfileMidumInput>
      </ProfileMidum>
      <ProfileBottom>
        <div>
          <ProfileBottomTitle>
            <span>자기소개</span>
          </ProfileBottomTitle>
          <ProfileBottomBox></ProfileBottomBox>
        </div>
      </ProfileBottom>
      <div>
        <button>수정</button>
      </div>
    </ProfileContainer>
  );
}

export default Profile;

const ProfileContainer = styled.div`
  padding: 0px 20px;
`;

const ProfileTop = styled.div`
  border: 1px solid black;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
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

const ProfileTopFollow = styled.div`
  border: 1px solid black;
  width: 450px;
  height: 86px;
  margin-top: 20px;
  display: flex;
  box-shadow: 5px 5px 5px 5px rgba(228, 220, 207, 0.3);
`;

const ProfileTopFollower = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileTopFollowing = styled.div`
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileMidum = styled.div`
  margin-top: 80px;
`;

const ProfileMidumInput = styled.div`
  margin-top: 50px;
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
  border: 1px solid black;
  margin-top: 50px;
`;

const ProfileBottomTitle = styled.div`
  margin-bottom: 20px;
`;

const ProfileBottomBox = styled.div`
  border: 1px solid black;
  width: 460px;
  height: 118px;
  border-radius: 10px;
`;
