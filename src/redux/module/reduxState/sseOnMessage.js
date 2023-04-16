import { createSlice } from '@reduxjs/toolkit';

const initialState = false;

const sseMessage = createSlice({
    name: 'sseMessage',
    initialState,
    reducers: {
        onMessage: (state, action) => (state = action.payload),
    },
});

export const { onMessage } = sseMessage.actions;

export default sseMessage;
