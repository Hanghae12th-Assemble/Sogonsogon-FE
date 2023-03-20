import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __searchUser = createAsyncThunk(
  "searchUser",
  async (searchInfo, thunkAPI) => {
    return await axios
      .get(`api/member/nickname?nickname=${searchInfo}`)
      .then((response) => {
        return thunkAPI.fulfillWithValue(response?.data);
      })
      .catch((error) => error);
  }
);

const initialState = {
  user: null,
  isLoading: false,
  error: null,
};

const searchUser = createSlice({
  name: "searchUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__searchUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__searchUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(__searchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default searchUser;
