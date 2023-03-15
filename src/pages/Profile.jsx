import React from "react";
import { useDispatch } from "react-redux";
import { __userFollow } from "../redux/module/userFollow";

function Profile() {
  const dispatch = useDispatch();

  const followBtn = () => {
    dispatch(__userFollow());
  };

  return (
    <div>
      <button onClick={followBtn}>팔로우하기</button>
    </div>
  );
}

export default Profile;
