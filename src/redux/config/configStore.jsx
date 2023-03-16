import { configureStore } from "@reduxjs/toolkit";
import signupRadio from "../module/signup";
import loginRadio from "../module/login";
import userFollow from "../module/userFollow";
import createRadio from "../module/createRadio";
import getRadio from "../module/getRadio";
import radioInfo from "../module/radioButton";

const sotre = configureStore({
  reducer: {
    signup: signupRadio.reducer,
    login: loginRadio.reducer,
    userFollowing: userFollow.reducer,
    creatingRadio: createRadio.reducer,
    gettingRadio: getRadio.reducer,
    radioButn: radioInfo.reducer,
  },
});

export default sotre;
