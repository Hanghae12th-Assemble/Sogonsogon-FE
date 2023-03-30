import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __siginup = createAsyncThunk(
  "signupRadio",
  async (siginupInfo, thunkAPI) => {
    return await axios
      .post("api/member/signup", siginupInfo)
      .then((response) => alert(response && "회원가입에 성공하였습니다."))
      .catch((error) =>
        alert(error && "중복되는 아이디 또는 이메일이 존재합니다.")
      );
  }
);

const initialState = {
  signup: null,
  isLoading: false,
  error: null,
};

const signup = createSlice({
  name: "signupRadio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__siginup.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__siginup.fulfilled, (state, action) => {
      state.isLoading = false;
      state.signup = action.payload;
      state.error = null;
    });
    builder.addCase(__siginup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default signup;
