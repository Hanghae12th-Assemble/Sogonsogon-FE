import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAudio = createAsyncThunk(
  "getAudio",
  async (page, thunkAPI) => {
    return await axios
      .get(`api/radios/?page=${page}&size=10&sortBy=createdAt`)
      .then((response) => thunkAPI.fulfillWithValue(response?.data))
      .catch((error) => alert(error && "다시 라디오를 조회해주세요."));
  }
);

const initialState = {
  audio: [],
  isLoading: false,
  error: null,
};

const getAudio = createSlice({
  name: "getAudio",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.audio = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = [...state.radio].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getAudio.actions;
export default getAudio;
