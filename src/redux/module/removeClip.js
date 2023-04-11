import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __removeClip = createAsyncThunk(
  "removeClip",
  async (audioclipId, thunkAPI) => {
    return await axios
      .delete(`api/audioclip/deleted/${audioclipId}`)
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) =>
        alert(error && "없는 클립 이거나, 클립 생성자가 아닙니다.")
      );
  }
);

const initialState = {
  clip: null,
  isLoading: false,
  error: null,
};

const removeClip = createSlice({
  name: "removeClip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__removeClip.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__removeClip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clip = action.payload;
      state.error = null;
    });
    builder.addCase(__removeClip.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default removeClip;
