import { configureStore } from "@reduxjs/toolkit";
import signupRadio from "../module/signup";
import loginRadio from "../module/login";
import userFollow from "../module/userFollow";
import createClip from "../module/createClip";
import getAudio from "../module/getAudio";
import radioInfo from "../module/reduxState/createRadioButton";
import profileInfo from "../module/reduxState/profileModifyButton";
import searchAudio from "../module/searchAudio";
import searchUser from "../module/searchUser";
import getFollowing from "../module/following";
import getFollower from "../module/follower";
import removeAudio from "../module/removeAudio";
import getProfile from "../module/getProfile";
import updateProfile from "../module/updateProfile";
import getAlarm from "../module/getAlarm";
import readAlarm from "../module/readAlarm";
import removeAlarm from "../module/removeAlarm";
import getClipDetail from "../module/getClipDetail";
import updateAudio from "../module/updateAudio";
import createAudioComment from "../module/createAudioComment";
import updateAudioComment from "../module/updateAudioComment";
import getAudioComment from "../module/getAudioComment";
import removeAudioComment from "../module/removeAudioComment";
import createAlbum from "../module/createAlbum";
import updateAlbum from "../module/updateAlbum";
import likeAlbum from "../module/likeAlbum";
import getAlbum from "../module/getAlbum";
import getAlbumCategory from "../module/getAlbumCategory";
import getAlbumDetail from "../module/getAlbumDetail";
import removeAlbum from "../module/removeAlbum";

const sotre = configureStore({
  reducer: {
    signup: signupRadio.reducer,
    login: loginRadio.reducer,
    userFollowing: userFollow.reducer,
    creatingClip: createClip.reducer,
    gettingAudio: getAudio.reducer,
    radioButn: radioInfo.reducer,
    profileButn: profileInfo.reducer,
    searchingAudio: searchAudio.reducer,
    searchingUser: searchUser.reducer,
    gettingFollowing: getFollowing.reducer,
    gettingFollower: getFollower.reducer,
    removingAudio: removeAudio.reducer,
    gettingProfile: getProfile.reducer,
    updatingProfile: updateProfile.reducer,
    gettingAlarm: getAlarm.reducer,
    readingAlarm: readAlarm.reducer,
    removingAlarm: removeAlarm.reducer,
    gettingClipDetail: getClipDetail.reducer,
    updatingAudio: updateAudio.reducer,
    creatingAudioComment: createAudioComment.reducer,
    updatingAudioComment: updateAudioComment.reducer,
    gettingAudioComment: getAudioComment.reducer,
    removingAudioComment: removeAudioComment.reducer,
    creatingAlbum: createAlbum.reducer,
    updatingAlbum: updateAlbum.reducer,
    likingAlbum: likeAlbum.reducer,
    gettingAlbum: getAlbum.reducer,
    gettingAlbumCategory: getAlbumCategory.reducer,
    gettingAlbumDetail: getAlbumDetail.reducer,
    removingAlbum: removeAlbum.reducer,
  },
});

export default sotre;
