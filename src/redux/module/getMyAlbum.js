import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../util/api/axios';

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getMyAlbum = createAsyncThunk('getMyAlbum', async (page, thunkAPI) => {
    return await axios
        .get(`api/audioAlbum/mine?page=${page}&size=10&sortBy=createdAt`)
        .then((response) => thunkAPI.fulfillWithValue(response.data))
        .catch((error) => alert(error && '앨범 조회에 실패하였습니다.'));
});

const initialState = {
    album: [],
    isLoading: false,
    error: null,
};

const getMyAlbum = createSlice({
    name: 'getMyAlbum',
    initialState,
    reducers: {
        initInfinitiScroll: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.album = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(__getMyAlbum.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__getMyAlbum.fulfilled, (state, action) => {
            state.isLoading = false;
            state.album = [...state.album].concat(action.payload);
            state.error = null;
        });
        builder.addCase(__getMyAlbum.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { initInfinitiScroll } = getMyAlbum.actions;
export default getMyAlbum;
