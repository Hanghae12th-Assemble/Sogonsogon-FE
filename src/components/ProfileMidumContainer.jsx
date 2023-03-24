import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../elements/Button";
import { __userFollow } from "../redux/module/userFollow";
import { __getProfile } from "../redux/module/getProfile";
import { pageswitch } from "../redux/module/reduxState/profileModifyButton";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../util/localStorage";

function ProfileMidumContainer() {
  const dispatch = useDispatch();
  const [pageState] = useState(false);
  const { id } = useParams();
  const info = JSON.parse(getLocalStorage("userInfo"));
  const userInfo = useSelector((state) => state?.updatingProfile?.profile);
  const getUserInfo = useSelector((state) => state?.gettingProfile?.profile);

  useEffect(() => {
    dispatch(__getProfile(id));
  }, []);

  const followBtn = () => {
    dispatch(__userFollow(id));
  };

  const onPageClick = () => {
    dispatch(pageswitch(!pageState));
  };

  return (
    <>
      <ProfileTopFollow>
        <ProfileTopFollower>
          <span>팔로워</span>
          <span>
            {userInfo?.followers ? userInfo?.followers : getUserInfo?.followers}
          </span>
        </ProfileTopFollower>
        <ProfileTopFollowing>
          <span>팔로잉</span>
          <span>
            {userInfo?.followings
              ? userInfo?.followings
              : getUserInfo?.followings}
          </span>
        </ProfileTopFollowing>
      </ProfileTopFollow>
      <ProfileButtonBox>
        {id === info.userName ? null : (
          <Button lgBtn onClick={followBtn}>
            팔로우하기
          </Button>
        )}
      </ProfileButtonBox>
      <ProfileBottom>
        <div>
          <ProfileBottomTitle>
            <span>자기소개</span>
          </ProfileBottomTitle>
          <ProfileBottomBox>
            <p>
              {userInfo?.introduction
                ? userInfo?.introduction
                : getUserInfo?.introduction}
            </p>
          </ProfileBottomBox>
        </div>
      </ProfileBottom>
      <ProfileBottomButton>
        <Button onClick={onPageClick} lgBtn>
          수정
        </Button>
      </ProfileBottomButton>
    </>
  );
}

export default ProfileMidumContainer;

const ProfileTopFollow = styled.div`
  //border: 1px solid black;
  width: 450px;
  height: 86px;
  margin-top: 20px;
  display: flex;
  border-radius: 10px;
  box-shadow: 5px 5px 5px 5px rgba(228, 220, 207, 0.4);
  background-color: #f5f4f2;
`;

const ProfileTopFollower = styled.div`
  //border-right: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileTopFollowing = styled.div`
  border-left: 1px solid rgba(228, 220, 207, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileBottom = styled.div`
  // border: 1px solid black;
  margin-top: 50px;
`;

const ProfileBottomTitle = styled.div`
  margin-bottom: 20px;
`;

const ProfileBottomBox = styled.div`
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

const ProfileBottomButton = styled.div`
  //border: 1px solid blue;
  padding: 20px;
  width: 100%;
  height: 180px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ProfileButtonBox = styled.div`
  //border: 1px solid black;
  display: flex;
  justify-content: center;
  margin-top: 35px;
`;
