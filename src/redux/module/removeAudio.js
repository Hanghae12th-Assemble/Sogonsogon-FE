import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __removeAudio = createAsyncThunk(
  "removeAudio",
  async (radioNumber, thunkAPI) => {
    return await axios
      .delete(`api/radios/${radioNumber}`)
      .then((response) => alert(response && "라디오가 삭제되었습니다."))
      .catch((error) =>
        alert(error && "없는 라디오 이거나, 라디오 생성자가 아닙니다.")
      );
  }
);

const initialState = {
  audio: null,
  isLoading: false,
  error: null,
};

const removeAudio = createSlice({
  name: "removeAudio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__removeAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__removeAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.audio = action.payload;
      state.error = null;
    });
    builder.addCase(__removeAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default removeAudio;
