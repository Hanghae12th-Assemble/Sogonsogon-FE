import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __removeAlbum = createAsyncThunk(
  "removeAlbum",
  async (albumId, thunkAPI) => {
    return await axios
      .delete(`api/audioAlbum/delete/${albumId}`)
      .then((response) => response.data)
      .catch((error) => error.message);
  }
);

const initialState = {
  album: null,
  isLoading: false,
  error: null,
};

const removeAlbum = createSlice({
  name: "removeAlbum",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__removeAlbum.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__removeAlbum.fulfilled, (state, action) => {
      state.isLoading = false;
      state.album = action.payload;
      state.error = null;
    });
    builder.addCase(__removeAlbum.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default removeAlbum;
