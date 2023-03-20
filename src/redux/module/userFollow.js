import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __userFollow = createAsyncThunk(
  "userFollow",
  async (memberId, thunkAPI) => {
    return await axios
      .post(`api/follow/${memberId}`, {})
      .then((response) => alert(response && "팔로우에 성공했습니다."))
      .catch((error) => alert(error && "팔로우에 실패했습니다."));
  }
);

const initialState = {
  follow: null,
  isLoading: false,
  error: null,
};

const userFollow = createSlice({
  name: "userFollow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__userFollow.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__userFollow.fulfilled, (state, action) => {
      state.isLoading = false;
      state.follow = action.payload;
      state.error = null;
    });
    builder.addCase(__userFollow.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userFollow;
