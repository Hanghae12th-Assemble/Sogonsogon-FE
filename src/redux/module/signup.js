import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __siginup = createAsyncThunk(
  "signupRadio",
  async (siginupInfo, thunkAPI) => {
    return await axios
      .post("api/member/signup", siginupInfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  user: null,
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
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(__siginup.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default signup;
