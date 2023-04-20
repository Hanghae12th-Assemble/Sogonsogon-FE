import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../util/api/axios';

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAlbumDetail = createAsyncThunk('getAlbumDetail', async (albumId, thunkAPI) => {
    return await axios
        .get(`api/audioAlbum/find/${albumId}`)
        .then((response) => thunkAPI.fulfillWithValue(response.data))
        .catch((error) => error.message);
});

const initialState = {
    album: null,
    isLoading: false,
    error: null,
};

const getAlbumDetail = createSlice({
    name: 'getAlbumDetail',
    initialState,
    reducers: {
        resetAlbumDetail: (state, action) => (state = { ...state, album: action.payload }),
    },
    extraReducers: (builder) => {
        builder.addCase(__getAlbumDetail.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__getAlbumDetail.fulfilled, (state, action) => {
            state.isLoading = false;
            state.album = action.payload;
            state.error = null;
        });
        builder.addCase(__getAlbumDetail.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { resetAlbumDetail } = getAlbumDetail.actions;
export default getAlbumDetail;
