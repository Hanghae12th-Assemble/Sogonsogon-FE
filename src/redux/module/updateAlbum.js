import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateAlbum = createAsyncThunk(
  "updateAlbum",
  async ({ albumId, albumInfo }, thunkAPI) => {
    return await axios
      .post(`api/audioAlbum/update/${albumId}`, albumInfo)
      .then((response) => alert(response && "앨범 수정에 성공하였습니다."))
      .catch((error) =>
        alert(error && "앨범 이름이 중복되거나 로그인 상태가 아닙니다.")
      );
  }
);

const initialState = {
  album: null,
  isLoading: false,
  error: null,
};

const updateAlbum = createSlice({
  name: "updateAlbum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__updateAlbum.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__updateAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = action.payload;
      state.error = null;
    });
    builder.addCase(__updateAlbum.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateAlbum;
