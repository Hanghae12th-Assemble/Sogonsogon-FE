import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __enterAudio = createAsyncThunk(
  "enterAudio ",
  async (radioId, thunkAPI) => {
    return await axios
      .post(`/api/radios/enter/${radioId}`, {})
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  audio: null,
  isLoading: false,
  error: null,
};

const enterAudio = createSlice({
  name: "enterAudio ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__enterAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__enterAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.audio = action.payload;
      state.error = null;
    });
    builder.addCase(__enterAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default enterAudio;
