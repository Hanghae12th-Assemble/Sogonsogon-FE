import { createSlice } from "@reduxjs/toolkit";

const initialState = false;

const clickOutside = createSlice({
  name: "clickModal",
  initialState,
  reducers: {
    clickOut: (state, action) => action.payload,
  },
});

export const { clickOut } = clickOutside.actions;

export default clickOutside;
