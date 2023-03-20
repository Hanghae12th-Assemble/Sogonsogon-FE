import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __createRadio = createAsyncThunk(
  "createRadio",
  async (radioInfo, thunkAPI) => {
    return await axios
      .post(`api/radios`, radioInfo)
      .then((response) => alert(response && "라디오 생성에 성공하였습니다."))
      .catch((error) => alert(error && "라디오 생성에 실패하였습니다."));
  }
);

const initialState = {
  radio: null,
  isLoading: false,
  error: null,
};

const createRadio = createSlice({
  name: "createRadio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__createRadio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__createRadio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = action.payload;
      state.error = null;
    });
    builder.addCase(__createRadio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default createRadio;
