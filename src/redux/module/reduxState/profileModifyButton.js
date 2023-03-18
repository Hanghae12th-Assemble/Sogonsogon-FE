import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const profileInfo = createSlice({
  name: "profileInfo",
  initialState,
  reducers: {
    pageswitch: (state, action) => action.payload,
  },
});

export const { pageswitch } = profileInfo.actions;

export default profileInfo;
