import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../util/axios";

export const __login = createAsyncThunk(
  "loginRadio",
  async (logininfo, thunkAPI) => {
    try {
      const response = await api.post("/api/member/login", logininfo);
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
      state.user = action.payload;
      state.error = null;
    });
    builder.addCase(__login.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default login;
