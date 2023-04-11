import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAudioComment = createAsyncThunk(
  "updateAudioComment",
  async ({ audioId, page }, thunkAPI) => {
    return await axios
      .get(
        `api/audioclip/comment/${audioId}?page=${page}&size=10&sortBy=createdAt`
      )
      .then((response) => thunkAPI.fulfillWithValue(response?.data?.data))
      .catch((error) => error.message);
  }
);

const initialState = {
  comment: [],
  isLoading: false,
  error: null,
};

const getAudioComment = createSlice({
  name: "getAudioComment",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.comment = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getAudioComment.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAudioComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = [...state.comment].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getAudioComment.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getAudioComment.actions;
export default getAudioComment;
