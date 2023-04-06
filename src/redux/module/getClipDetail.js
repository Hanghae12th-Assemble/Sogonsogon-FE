import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getClipDetail = createAsyncThunk(
  "getClipDetail ",
  async (audioId, thunkAPI) => {
    return await axios
      .get(`api/audioclip/${audioId}`, {})
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  clip: null,
  isLoading: false,
  error: null,
};

const getClipDetail = createSlice({
  name: "getClipDetail ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getClipDetail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getClipDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.audio = action.payload;
      state.error = null;
    });
    builder.addCase(__getClipDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getClipDetail;
