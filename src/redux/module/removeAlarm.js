import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../util/api/axios';

const axios = new Axios(process.env.REACT_APP_BASE_URL);

export const __removeAlarm = createAsyncThunk('removeAlarm', async (notificationId, thunkAPI) => {
    return await axios
        .delete(`api/notificaiton/${notificationId}`)
        .then((response) => thunkAPI.fulfillWithValue(response?.data?.data))
        .catch((error) => alert(error && '이미 삭제된 알람입니다.'));
});

const initialState = {
    alarm: null,
    isLoading: false,
    error: null,
};

const removeAlarm = createSlice({
    name: 'removeAlarm',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(__removeAlarm.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(__removeAlarm.fulfilled, (state, action) => {
            state.isLoading = false;
            state.alarm = action.payload;
            state.error = null;
        });
        builder.addCase(__removeAlarm.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        });
    },
});

export default removeAlarm;
