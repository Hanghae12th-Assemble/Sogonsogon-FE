import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __createAudio = createAsyncThunk(
  "createAudio",
  async (audioInfo, thunkAPI) => {
    return await axios
      .post(`api/audioclip/uploaded`, audioInfo)
      .then((response) => alert(response && "오디오 생성에 성공하였습니다."))
      .catch((error) =>
        alert(error && "오디오 이름이 중복되거나 로그인 상태가 아닙니다.")
      );
  }
);

const initialState = {
  radio: null,
  isLoading: false,
  error: null,
};

const createAudio = createSlice({
  name: "createAudio",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__createAudio.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__createAudio.fulfilled, (state, action) => {
      state.isLoading = false;
      state.radio = action.payload;
      state.error = null;
    });
    builder.addCase(__createAudio.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default createAudio;
