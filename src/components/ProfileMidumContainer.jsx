import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../elements/Button";
import { __userFollow } from "../redux/module/userFollow";
import { __getProfile } from "../redux/module/getProfile";
import { __getFollow } from "../redux/module/getFollow";
import { useParams } from "react-router-dom";
import { getLocalStorage } from "../util/localStorage";
import { useThrottledCallback } from "../hooks/useThrottledCallback";
import decryptData from "../util/decryptKey";
import Loading from "../components/Loading";

function ProfileMidumContainer() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const encryptedUserInfo = getLocalStorage("userInfo");
  const info = decryptData(encryptedUserInfo);
  const updateUserInfo = useSelector(
    (state) => state?.updatingProfile?.profile
  );
  const getUserInfo = useSelector((state) => state?.gettingProfile?.profile);
  const getUserInfoLoding = useSelector((state) => state?.gettingProfile);
  const getFollowing = useSelector(
    (state) => state?.gettingFollow?.follow?.isFollowCheck
  );
  const userFollow = useSelector((state) => state?.userFollowing);

  useEffect(() => {
    dispatch(__getProfile(id));
    dispatch(__getFollow(id));
  }, [updateUserInfo, userFollow]);

  const followBtn = useThrottledCallback(
    () => {
      dispatch(__userFollow(id));
    },
    1000,
    [dispatch, id]
  );

  if (getUserInfoLoding?.isLoading) {
    return (
      <ProfileLoding>
        <Loading />
      </ProfileLoding>
    );
  }

  return (
    <>
      <ProfileTop>
        <ProfileTopPhoto>
          <ProfileImg src={getUserInfo?.profileImageUrl} alt="Preview" />
        </ProfileTopPhoto>
        <ProfileTopName>
          <ProfileTopnicknameMembername>
            <ProfileTopMembername>{getUserInfo?.nickname}</ProfileTopMembername>
          </ProfileTopnicknameMembername>
          <ProfileTopnicknameMembername>
            <ProfileTopnickName>@{getUserInfo?.membername}</ProfileTopnickName>
          </ProfileTopnicknameMembername>
        </ProfileTopName>
      </ProfileTop>
      <ProfileTopFollowBox>
        <ProfileTopFollow>
          <ProfileTopFollower>
            <span>팔로워</span>
            <span>{getUserInfo?.followers}</span>
          </ProfileTopFollower>
          <ProfileTopFollowing>
            <span>팔로잉</span>
            <span>{getUserInfo?.followings}</span>
          </ProfileTopFollowing>
        </ProfileTopFollow>
      </ProfileTopFollowBox>
      <ProfileButtonBox>
        {id === info?.userName ? null : (
          <Button lgBtn onClick={followBtn}>
            {getFollowing ? "팔로우 취소" : "팔로우"}
          </Button>
        )}
      </ProfileButtonBox>
      <ProfileBottom>
        <div>
          <ProfileBottomTitle>
            <span>자기소개</span>
          </ProfileBottomTitle>
          <ProfileBottomBox>
            <p>{getUserInfo?.introduction}</p>
          </ProfileBottomBox>
        </div>
      </ProfileBottom>
      <ProfileBottomButton></ProfileBottomButton>
    </>
  );
}

export default ProfileMidumContainer;

const ProfileLoding = styled.div`
  height: 100%;
  width: 95%;
  position: absolute;
`;

const ProfileTop = styled.div`
  height: 12.5rem;
  display: flex;
  align-items: center;
  margin-top: 5rem;
`;

const ProfileTopPhoto = styled.div`
  border-radius: 50%;
  width: 7.5rem;
  height: 7.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 6.25rem;
  height: 6.25rem;
  border-radius: 50%;
`;

const ProfileTopnicknameMembername = styled.div`
  margin-bottom: 0.625rem;
  margin-left: 0.625rem;
  position: relative;
  bottom: 0.625rem;
`;

const ProfileTopnickName = styled.span`
  font-weight: 400;
  opacity: 80%;
`;

const ProfileTopMembername = styled.span`
  font-size: 1.25rem;
  font-weight: bold;
  font-size: 20px;
`;

const ProfileTopName = styled.div`
  margin-top: 1.25rem;
`;

const ProfileTopFollowBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const ProfileTopFollow = styled.div`
  width: 28.125rem;
  height: 5.375rem;
  margin-top: 0.625rem;
  display: flex;
  align-items: center;
  border-radius: 0.625rem;
  background-color: ${({ theme }) => theme.color.softGray_col};
`;

const ProfileTopFollower = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileTopFollowing = styled.div`
  border-left: 0.0625rem solid rgba(228, 220, 207, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const ProfileBottom = styled.div`
  margin-top: 3.125rem;
`;

const ProfileBottomTitle = styled.div`
  margin-bottom: 1.25rem;
  font-weight: bold;
`;

const ProfileBottomBox = styled.div`
  width: 28.75rem;
  height: 3rem;
  border-radius: 0.625rem;
  border: none;
  background-color: ${({ theme }) => theme.color.darkWhite_col};
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 0.625rem;
  margin-top: 1.25rem;
`;

const ProfileBottomButton = styled.div`
  padding: 1.25rem;
  width: 100%;
  height: 11.25rem;
  display: flex;
  justify-content: center;
  align-items: flex-end;
`;

const ProfileButtonBox = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 2.1875rem;
`;
