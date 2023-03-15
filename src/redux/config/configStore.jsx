import { configureStore } from "@reduxjs/toolkit";
import signupRadio from "../module/signup";
import loginRadio from "../module/login";
import userFollow from "../module/userFollow";

const sotre = configureStore({
  reducer: {
    signup: signupRadio.reducer,
    login: loginRadio.reducer,
    userFollowing: userFollow.reducer,
  },
});

export default sotre;
