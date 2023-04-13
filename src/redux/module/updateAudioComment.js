import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateAudioComment = createAsyncThunk(
  "updateAudioComment",
  async ({ commentId, commentInfo }, thunkAPI) => {
    return await axios
      .put(`api/audioclip/comment/${commentId}`, commentInfo)
      .then((response) => response.data)
      .catch((error) => alert(error && "오디오 덧글 수정에 실패했습니다."));
  }
);

const initialState = {
  comment: null,
  isLoading: false,
  error: null,
};

const updateAudioComment = createSlice({
  name: "updateAudioComment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__updateAudioComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__updateAudioComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
      state.error = null;
    });
    builder.addCase(__updateAudioComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateAudioComment;
