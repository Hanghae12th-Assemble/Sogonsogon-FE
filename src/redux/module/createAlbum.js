import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __createAlbum = createAsyncThunk(
  "createAlbum",
  async (albumInfo, thunkAPI) => {
    return await axios
      .post(`api/audioAlbum/upload`, albumInfo)
      .then((response) => response.data.statusCode)
      .catch((error) => console.log(error));
  }
);

const initialState = {
  album: null,
  isLoading: false,
  error: null,
};

const createAlbum = createSlice({
  name: "createAlbum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__createAlbum.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__createAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = action.payload;
      state.error = null;
    });
    builder.addCase(__createAlbum.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default createAlbum;
