import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateAudio = createAsyncThunk(
  "updateAudio",
  async ({ audioId, audioInfo }, thunkAPI) => {
    return await axios
      .put(`api/audioclip/updated/${audioId}`, audioInfo)
      .then((response) => alert(response && "오디오 생성에 성공하였습니다."))
      .catch((error) =>
        alert(error && "오디오 이름이 중복되거나 로그인 상태가 아닙니다.")
      );
  }
);

const initialState = {
  audio: null,
  isLoading: false,
  error: null,
};

const updateAudio = createSlice({
  name: "updateAudio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__updateAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__updateAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.audio = action.payload;
      state.error = null;
    });
    builder.addCase(__updateAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateAudio;
