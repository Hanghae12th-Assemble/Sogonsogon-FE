import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __createAudioComment = createAsyncThunk(
  "createAudioComment",
  async ({ audioId, commentInfo }, thunkAPI) => {
    return await axios
      .post(`api/audioclip/comment/${audioId}`, commentInfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  comment: null,
  isLoading: false,
  error: null,
};

const createAudioComment = createSlice({
  name: "createAudioComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__createAudioComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__createAudioComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
      state.error = null;
    });
    builder.addCase(__createAudioComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default createAudioComment;
