import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __userFollow = createAsyncThunk(
  "userFollow",
  async (memberId, thunkAPI) => {
    return await axios
      .post(`api/follow/${memberId}`, {})
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  user: null,
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
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(__userFollow.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default userFollow;
