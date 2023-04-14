import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../util/api/axios';

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __getAlbumCategory = createAsyncThunk(
    'getAlbumCategory',
    async ({ page, categoryType }, thunkAPI) => {
        return await axios
            .get(`api/audioAlbum/${categoryType}?page=${page}&size=5&sortBy=createdAt`)
            .then((response) => thunkAPI.fulfillWithValue(response.data))
            .catch((error) => thunkAPI.rejectWithValue(error));
    }
);

const initialState = {
    album: [],
    isLoading: false,
    error: null,
};

const getAlbumCategory = createSlice({
    name: 'getAlbumCategory',
    initialState,
    reducers: {
        initInfinitiScroll: (state, action) => {
            state.isLoading = false;
            state.error = false;
            state.album = [];
        },
    },
    extraReducers: (builder) => {
        builder.addCase(__getAlbumCategory.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__getAlbumCategory.fulfilled, (state, action) => {
            state.isLoading = false;
            state.album = [...state.album].concat(action.payload);
            state.error = null;
        });
        builder.addCase(__getAlbumCategory.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export const { initInfinitiScroll } = getAlbumCategory.actions;
export default getAlbumCategory;
