import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __likeAlbum = createAsyncThunk(
  "likeAlbum",
  async (albumId, thunkAPI) => {
    return await axios
      .post(`api/audioAlbum/like/${albumId}`, {})
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => alert(error && "앨범 좋아요에 실패하였습니다."));
  }
);

const initialState = {
  album: null,
  isLoading: false,
  error: null,
};

const likeAlbum = createSlice({
  name: "likeAlbum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__likeAlbum.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__likeAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = action.payload;
      state.error = null;
    });
    builder.addCase(__likeAlbum.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default likeAlbum;
