import { configureStore } from "@reduxjs/toolkit";
import signupRadio from "../module/signup";
import loginRadio from "../module/login";
import userFollow from "../module/userFollow";
import createClip from "../module/createClip";
import radioInfo from "../module/reduxState/createRadioButton";
import profileInfo from "../module/reduxState/profileModifyButton";
import searchAudio from "../module/searchAudio";
import searchUser from "../module/searchUser";
import removeClip from "../module/removeClip";
import getProfile from "../module/getProfile";
import updateProfile from "../module/updateProfile";
import getAlarm from "../module/getAlarm";
import removeAlarm from "../module/removeAlarm";
import getClipDetail from "../module/getClipDetail";
import updateClip from "../module/updateClip";
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
import getClips from "../module/geClips";
import clickModal from "../module/reduxState/clickShutDown";
import getMyAlbum from "../module/getMyAlbum";
import getFollow from "../module/getFollow";
import likeClip from "../module/likeClip";
import clickModiComment from "../module/reduxState/clickModiComment";
import sseMessage from "../module/reduxState/sseOnMessage";

const sotre = configureStore({
  reducer: {
    signup: signupRadio.reducer,
    login: loginRadio.reducer,
    userFollowing: userFollow.reducer,
    creatingClip: createClip.reducer,
    radioButn: radioInfo.reducer,
    profileButn: profileInfo.reducer,
    searchingAudio: searchAudio.reducer,
    searchingUser: searchUser.reducer,
    removingClip: removeClip.reducer,
    gettingProfile: getProfile.reducer,
    updatingProfile: updateProfile.reducer,
    gettingAlarm: getAlarm.reducer,
    removingAlarm: removeAlarm.reducer,
    gettingClipDetail: getClipDetail.reducer,
    updatingClip: updateClip.reducer,
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
    gettingClips: getClips.reducer,
    clickingModal: clickModal.reducer,
    gettingMyAlbum: getMyAlbum.reducer,
    removingMyAlbum: removeAlbum.reducer,
    gettingFollow: getFollow.reducer,
    likingClip: likeClip.reducer,
    clickingModiComment: clickModiComment.reducer,
    sseOnMessaging: sseMessage.reducer,
  },
});

export default sotre;
