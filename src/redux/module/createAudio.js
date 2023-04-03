import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __createAudio = createAsyncThunk(
  "createAudio",
  async (audioInfo, thunkAPI) => {
    return await axios
      .post(`api/audioclip/uploaded`, audioInfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  audio: null,
  isLoading: false,
  error: null,
};

const createAudio = createSlice({
  name: "createAudio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__createAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__createAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.audio = action.payload;
      state.error = null;
    });
    builder.addCase(__createAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default createAudio;
