import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __searchRadio = createAsyncThunk(
  "searchRadio",
  async (searchInfo, thunkAPI) => {
    return await axios
      .get(`api/radios/find?title=${searchInfo}`)
      .then((response) => {
        return thunkAPI.fulfillWithValue(response?.data);
      })
      .catch((error) => error);
  }
);

const initialState = {
  live: null,
  isLoading: false,
  error: null,
};

const searchRadio = createSlice({
  name: "searchRadio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__searchRadio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__searchRadio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.live = action.payload;
      state.error = null;
    });
    builder.addCase(__searchRadio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default searchRadio;
