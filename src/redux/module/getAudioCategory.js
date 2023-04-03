import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getCategoryRadio = createAsyncThunk(
  "getProfile",
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
  radio: [],
  isLoading: false,
  error: null,
};

const getProfile = createSlice({
  name: "getProfile",
  initialState,
  reducers: {
    initInfinitiScroll: (state, action) => {
      state.isLoading = false;
      state.error = false;
      state.radio = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(__getCategoryRadio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__getCategoryRadio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = [...state.radio].concat(action.payload);
      state.error = null;
    });
    builder.addCase(__getCategoryRadio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export const { initInfinitiScroll } = getProfile.actions;
export default getProfile;
