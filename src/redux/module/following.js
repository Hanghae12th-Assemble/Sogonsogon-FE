import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getFollowing = createAsyncThunk(
  "getFollowing",
  async (number, thunkAPI) => {
    return await axios
      .get(`api/follow/${number}/following`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  following: [],
  isLoading: false,
  error: null,
};

const getFollowing = createSlice({
  name: "getFollowing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getFollowing.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getFollowing.fulfilled, (state, action) => {
      state.isLoading = false;
      state.following = action.payload;
      state.error = null;
    });
    builder.addCase(__getFollowing.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getFollowing;
