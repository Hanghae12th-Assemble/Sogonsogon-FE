import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const buttonInfo = createSlice({
  name: "buttonInfo",
  initialState,
  reducers: {
    butn: (state, action) => {
      const { title, scope } = action.payload;
      state[0] = { title, scope };
    },
  },
});

export const { butn } = buttonInfo.actions;

export default buttonInfo;
