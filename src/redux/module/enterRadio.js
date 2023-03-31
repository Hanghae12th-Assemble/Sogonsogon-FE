import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __enterRadio = createAsyncThunk(
  "enterRadio ",
  async (radioId, thunkAPI) => {
    return await axios
      .post(`/api/radios/enter/${radioId}`, {})
      .then((response) => thunkAPI.fulfillWithValue(response.data))
      .catch((error) => console.log(error));
  }
);

const initialState = {
  radio: null,
  isLoading: false,
  error: null,
};

const enterRadio = createSlice({
  name: "enterRadio ",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__enterRadio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__enterRadio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = action.payload;
      state.error = null;
    });
    builder.addCase(__enterRadio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default enterRadio;
