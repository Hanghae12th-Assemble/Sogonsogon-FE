import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getFollow = createAsyncThunk(
  "getFollow",
  async (membername, thunkAPI) => {
    return await axios
      .get(`api/member/?membername=${membername}`)
      .then((response) => thunkAPI.fulfillWithValue(response.data.data))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  follow: null,
  isLoading: false,
  error: null,
};

const getFollow = createSlice({
  name: "getFollow",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getFollow.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getFollow.fulfilled, (state, action) => {
      state.isLoading = false;
      state.follow = action.payload;
      state.error = null;
    });
    builder.addCase(__getFollow.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getFollow;
