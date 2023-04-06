import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __createCip = createAsyncThunk(
  "createCip",
  async (audioInfo, thunkAPI) => {
    return await axios
      .post(`api/audioclip/uploaded`, audioInfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  clip: null,
  isLoading: false,
  error: null,
};

const createCip = createSlice({
  name: "createCip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__createCip.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__createCip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clip = action.payload;
      state.error = null;
    });
    builder.addCase(__createCip.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default createCip;
