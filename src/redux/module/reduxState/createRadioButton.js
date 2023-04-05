import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const buttonInfo = createSlice({
  name: "buttonInfo",
  initialState,
  reducers: {
    butn: (state, action) => {
      const title = action.payload;
      state[0] = title;
    },
  },
});

export const { butn } = buttonInfo.actions;

export default buttonInfo;
