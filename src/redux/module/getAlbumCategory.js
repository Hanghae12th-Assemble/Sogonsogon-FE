import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAlbumCategory = createAsyncThunk(
  "getAlbumCategory",
  async ({ page, categoryType }, thunkAPI) => {
    return await axios
      .get(
        `api/audioAlbum/${categoryType}?page=${page}&size=5&sortBy=createdAt`
      )
      .then((response) => alert(response && "앨범 조회에 성공하였습니다."))
      .catch((error) => alert(error && "앨범 조회에 실패하였습니다."));
  }
);

const initialState = {
  album: null,
  isLoading: false,
  error: null,
};

const getAlbumCategory = createSlice({
  name: "getAlbumCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getAlbumCategory.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAlbumCategory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = action.payload;
      state.error = null;
    });
    builder.addCase(__getAlbumCategory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAlbumCategory;
