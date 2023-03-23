import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateProfile = createAsyncThunk(
  "updateProfile",
  async ({ memberId, profileInfo }, thunkAPI) => {
    return await axios
      .post(`api/member/update/${memberId}`, profileInfo)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  profile: null,
  isLoading: false,
  error: null,
};

const updateProfile = createSlice({
  name: "updateProfile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__updateProfile.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.profile = action.payload;
      state.error = null;
    });
    builder.addCase(__updateProfile.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateProfile;
