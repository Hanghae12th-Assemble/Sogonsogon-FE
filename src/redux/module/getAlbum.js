import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAlbum = createAsyncThunk(
  "getAlbum",
  async (page, thunkAPI) => {
    return await axios
      .get(`api/audioAlbum?page=${page}&size=10&sortBy=createdAt`)
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => thunkAPI.rejectWithValue(error));
  }
);

const initialState = {
  album: [],
  isLoading: false,
  error: null,
};

const getAlbum = createSlice({
  name: "getAlbum",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.album = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getAlbum.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = [...state.album].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getAlbum.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getAlbum.actions;
export default getAlbum;
