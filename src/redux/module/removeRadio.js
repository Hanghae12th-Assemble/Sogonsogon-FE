import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __removeRadio = createAsyncThunk(
  "removeRadio",
  async (radioNumber, thunkAPI) => {
    return await axios
      .delete(`api/radios/${radioNumber}`)
      .then((response) => alert(response && "라디오가 삭제되었습니다."))
      .catch((error) => alert(error && "라디오 삭제에 실패하였습니다."));
  }
);

const initialState = {
  radio: null,
  isLoading: false,
  error: null,
};

const removeRadio = createSlice({
  name: "removeRadio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__removeRadio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__removeRadio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = action.payload;
      state.error = null;
    });
    builder.addCase(__removeRadio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default removeRadio;
