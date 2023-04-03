import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getCategoryAdudio = createAsyncThunk(
  "getCategoryAdudio",
  async ({ categoryType, page }, thunkAPI) => {
    return await axios
      .get(`api/radios/${categoryType}?page=${page}&size=8&sortBy=createdAt`)
      .then((response) => thunkAPI.fulfillWithValue(response?.data))
      .catch((error) =>
        alert(error && "다시 카테고리 프로필을 조회 해주세요.")
      );
  }
);

const initialState = {
  audio: [],
  isLoading: false,
  error: null,
};

const getCategoryAdudio = createSlice({
  name: "getCategoryAdudio",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.radio = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getCategoryAdudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getCategoryAdudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.audio = [...state.audio].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getCategoryAdudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getCategoryAdudio.actions;
export default getCategoryAdudio;
