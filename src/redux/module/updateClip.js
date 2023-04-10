import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateClip = createAsyncThunk(
  "updateClip",
  async ({ audioablumId, clipInfo }, thunkAPI) => {
    return await axios
      .put(`api/audioclip/updated/${audioablumId}`, clipInfo)
      .then((response) => response.data.statusCode)
      .catch((error) => thunkAPI.rejectWithValue(error.message));
  }
);

const initialState = {
  clip: null,
  isLoading: false,
  error: null,
};

const updateClip = createSlice({
  name: "updateClip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__updateClip.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__updateClip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clip = action.payload;
      state.error = null;
    });
    builder.addCase(__updateClip.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateClip;
