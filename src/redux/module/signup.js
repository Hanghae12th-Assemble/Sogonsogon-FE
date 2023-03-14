import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../util/axios";

export const __siginup = createAsyncThunk(
  "signupRadio",
  async (siginupInfo, thunkAPI) => {
    try {
      const response = await api.post("/api/member/signup", siginupInfo);
      console.log(response);
    } catch (e) {
      console.log(e);
    }
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
