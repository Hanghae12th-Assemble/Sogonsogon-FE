import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../util/api/axios';

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __readAlarm = createAsyncThunk('readAlarm', async (notificationId, thunkAPI) => {
    return await axios
        .put(`api/notificaiton/${notificationId}/confirm`)
        .then((response) => response.data.data)
        .catch((error) => console.log(error));
});

const initialState = {
    alarm: null,
    isLoading: false,
    error: null,
};

const readAlarm = createSlice({
    name: 'readAlarm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(__readAlarm.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__readAlarm.fulfilled, (state, action) => {
            state.isLoading = false;
            state.alarm = action.payload;
            state.error = null;
        });
        builder.addCase(__readAlarm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default readAlarm;
