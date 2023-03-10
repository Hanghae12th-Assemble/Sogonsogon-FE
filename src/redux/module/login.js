import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __login = createAsyncThunk(
  "loginRadio",
  async (logininfo, thunkAPI) => {
    return await axios
      .post("api/member/login", logininfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
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
