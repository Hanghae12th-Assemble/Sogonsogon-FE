import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getFollower = createAsyncThunk(
  "getFollower",
  async (number, thunkAPI) => {
    return await axios
      .get(`api/follow/${number}/follower`)
      .then((response) => alert(response && "팔로워 조회에 성공하였습니다."))
      .catch((error) => alert(error && "유저이름이 틀렸습니다."));
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
