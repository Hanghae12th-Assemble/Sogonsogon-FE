import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getProfile = createAsyncThunk(
  "getProfile",
  async (membername, thunkAPI) => {
    return await axios
      .get(`api/member/?membername=${membername}`)
      .then((response) => thunkAPI.fulfillWithValue(response?.data?.data))
      .catch((error) => alert(error && "다시 프로필을 조회 해주세요."));
  }
);

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const getProfile = createSlice({
  name: "getProfile",
  initialState,
  reducers: {
    resetProfile: (state, action) =>
      (state = { ...state, profile: action.payload }),
  },
  extraReducers: (builder) => {
    builder.addCase(__getProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(__getProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { resetProfile } = getProfile.actions;
export default getProfile;
