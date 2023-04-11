import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __searchAudio = createAsyncThunk(
  "searchAudio",
  async (searchInfo, thunkAPI) => {
    return await axios
      .get(`api/audioAlbum/find?title=${searchInfo}`)
      .then((response) => {
        return thunkAPI.fulfillWithValue(response?.data);
      })
      .catch((error) => error.message);
  }
);

const initialState = {
  live: null,
  isLoading: false,
  error: null,
};

const searchAudio = createSlice({
  name: "searchAudio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__searchAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__searchAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.live = action.payload;
      state.error = null;
    });
    builder.addCase(__searchAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default searchAudio;
