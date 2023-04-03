import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAudioComment = createAsyncThunk(
  "updateAudioComment",
  async (audioId, thunkAPI) => {
    return await axios
      .get(`api/audioclip/comment/${audioId}`)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  comment: null,
  isLoading: false,
  error: null,
};

const getAudioComment = createSlice({
  name: "getAudioComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getAudioComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAudioComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
      state.error = null;
    });
    builder.addCase(__getAudioComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAudioComment;
