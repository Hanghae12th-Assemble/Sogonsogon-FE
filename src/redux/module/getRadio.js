import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getRadio = createAsyncThunk(
  "getRadio",
  async (page, thunkAPI) => {
    return await axios
      .get(`api/radios/?page=${page}&size=10&sortBy=createdAt`)
      .then((response) => thunkAPI.fulfillWithValue(response?.data))
      .catch((error) => alert(error && "다시 라디오를 조회해주세요."));
  }
);

const initialState = {
  radio: [],
  isLoading: false,
  error: null,
};

const getRadio = createSlice({
  name: "getRadio",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.radio = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getRadio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getRadio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = [...state.radio].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getRadio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getRadio.actions;
export default getRadio;
