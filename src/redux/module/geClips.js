import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getClips = createAsyncThunk(
  "getClips",
  async ({ id, page }, thunkAPI) => {
    return await axios
      .get(`api/audioclip/clips/${id}?page=${page}&size=10&sortBy=createdAt`)
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => error.message);
  }
);

const initialState = {
  clip: [],
  isLoading: false,
  error: null,
};

const getClips = createSlice({
  name: "getClips",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.clip = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getClips.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getClips.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clip = [...state.clip].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getClips.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getClips.actions;
export default getClips;
