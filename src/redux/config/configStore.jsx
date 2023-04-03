import { configureStore } from "@reduxjs/toolkit";
import signupRadio from "../module/signup";
import loginRadio from "../module/login";
import userFollow from "../module/userFollow";
import createAudio from "../module/createAudio";
import getAudio from "../module/getAudio";
import radioInfo from "../module/reduxState/createRadioButton";
import profileInfo from "../module/reduxState/profileModifyButton";
import searchRadio from "../module/searchRadio";
import searchUser from "../module/searchUser";
import getFollowing from "../module/following";
import getFollower from "../module/follower";
import removeRadio from "../module/removeRadio";
import getProfile from "../module/getProfile";
import getRadioCategory from "../module/getRadioCategory";
import updateProfile from "../module/updateProfile";
import getAlarm from "../module/getAlarm";
import readAlarm from "../module/readAlarm";
import removeAlarm from "../module/removeAlarm";
import enterAudio from "../module/enterAudio";

const sotre = configureStore({
  reducer: {
    signup: signupRadio.reducer,
    login: loginRadio.reducer,
    userFollowing: userFollow.reducer,
    creatingAudio: createAudio.reducer,
    gettingAudio: getAudio.reducer,
    radioButn: radioInfo.reducer,
    profileButn: profileInfo.reducer,
    searchingRadio: searchRadio.reducer,
    searchingUser: searchUser.reducer,
    gettingFollowing: getFollowing.reducer,
    gettingFollower: getFollower.reducer,
    removingRadio: removeRadio.reducer,
    gettingProfile: getProfile.reducer,
    gettingRadioCategory: getRadioCategory.reducer,
    updatingProfile: updateProfile.reducer,
    gettingAlarm: getAlarm.reducer,
    readingAlarm: readAlarm.reducer,
    removingAlarm: removeAlarm.reducer,
    enteringAudio: enterAudio.reducer,
  },
});

export default sotre;
