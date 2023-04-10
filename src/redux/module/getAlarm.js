import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAlarm = createAsyncThunk(
  "getAlarm",
  async (alram, thunkAPI) => {
    return await axios
      .get("api/notificaiton/AllNotifications")
      .then((response) => thunkAPI.fulfillWithValue(response?.data?.data))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  alarm: null,
  isLoading: false,
  error: null,
};

const getAlarm = createSlice({
  name: "getAlarm",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__getAlarm.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getAlarm.fulfilled, (state, action) => {
      state.isLoading = false;
      state.alarm = action.payload;
      state.error = null;
    });
    builder.addCase(__getAlarm.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default getAlarm;
