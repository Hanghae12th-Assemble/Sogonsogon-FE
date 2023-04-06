import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAlbumDetail = createAsyncThunk(
  "getAlbumDetail",
  async (albumId, thunkAPI) => {
    return await axios
      .get(`api/audioAlbum/find/${albumId}`)
      .then((response) => alert(response && "앨범 상세 조회에 성공하였습니다."))
      .catch((error) => alert(error && "앨범 상세 조회에 실패하였습니다."));
  }
);

const initialState = {
  album: null,
  isLoading: false,
  error: null,
};

const getAlbumDetail = createSlice({
  name: "getAlbumDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getAlbumDetail.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAlbumDetail.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = action.payload;
      state.error = null;
    });
    builder.addCase(__getAlbumDetail.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAlbumDetail;
