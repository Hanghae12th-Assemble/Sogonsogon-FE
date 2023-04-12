import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const clickModiComment = createSlice({
  name: "clickModal",
  initialState,
  reducers: {
    clickModi: (state, action) => action.payload,
  },
});

export const { clickModi } = clickModiComment.actions;

export default clickModiComment;
