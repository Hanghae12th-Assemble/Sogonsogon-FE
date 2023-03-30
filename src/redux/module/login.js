import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __login = createAsyncThunk(
  "loginRadio",
  async (logininfo, thunkAPI) => {
    return await axios
      .post("api/member/login", logininfo)
      .then((response) => alert(response && "로그인 되었습니다."))
      .catch((error) =>
        alert(error && "아이디 비밀번호가 없거나, 존재 하지 않는 계정입니다.")
      );
  }
);

const initialState = {
  login: null,
  isLoading: false,
  error: null,
};

const login = createSlice({
  name: "loginRadio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__login.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.login = action.payload;
      state.error = null;
    });
    builder.addCase(__login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default login;
