import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../util/api/axios';

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __likeClip = createAsyncThunk('likeClip', async (audioclipId, thunkAPI) => {
    return await axios
        .post(`api/audioclip/like/${audioclipId}`, {})
        .then((response) => thunkAPI.fulfillWithValue(response.data))
        .catch((error) => alert(error && '클립 좋아요에 실패하였습니다.'));
});

const initialState = {
    clip: null,
    isLoading: false,
    error: null,
};

const likeClip = createSlice({
    name: 'likeClip',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(__likeClip.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__likeClip.fulfilled, (state, action) => {
            state.isLoading = false;
            state.clip = action.payload;
            state.error = null;
        });
        builder.addCase(__likeClip.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default likeClip;
