import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../util/api/axios";

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __updateClip = createAsyncThunk(
  "updateClip",
  async ({ audioablumId, clipInfo }, thunkAPI) => {
    console.log(audioablumId, clipInfo);
    // return await axios
    //   .put(`api/audioclip/updated/${audioablumId}`, clipInfo)
    //   .then((response) => alert(response && "오디오 생성에 성공하였습니다."))
    //   .catch((error) =>
    //     alert(error && "오디오 이름이 중복되거나 로그인 상태가 아닙니다.")
    //   );
  }
);

const initialState = {
  clip: null,
  isLoading: false,
  error: null,
};

const updateClip = createSlice({
  name: "updateClip",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(__updateClip.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(__updateClip.fulfilled, (state, action) => {
      state.isLoading = false;
      state.clip = action.payload;
      state.error = null;
    });
    builder.addCase(__updateClip.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    });
  },
});

export default updateClip;
