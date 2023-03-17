import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getFollower = createAsyncThunk(
  "getFollower",
  async (number, thunkAPI) => {
    return await axios
      .get(`api/follow/${number}/follower`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  follower: [],
  isLoading: false,
  error: null,
};

const getFollower = createSlice({
  name: "getFollower",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getFollower.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getFollower.fulfilled, (state, action) => {
      state.isLoading = false;
      state.follower = action.payload;
      state.error = null;
    });
    builder.addCase(__getFollower.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getFollower;
