import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateAlbum = createAsyncThunk(
  "updateAlbum",
  async ({ albumId, albumInfo }, thunkAPI) => {
    return await axios
      .post(`api/audioAlbum/update/${albumId}`, albumInfo)
      .then((response) => response.data.statusCode)
      .catch((error) => thunkAPI.rejectWithValue(error.response));
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
