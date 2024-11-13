// store.js
import { configureStore, createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
    name: "history",
    initialState: [],
    reducers: {
        addEntry: (state, action) => {
            state.push(action.payload);
        },
        setHistory: (state, action) => {
            return action.payload;
        },
    },
});

export const { addEntry, setHistory } = historySlice.actions;

const store = configureStore({
    reducer: {
        history: historySlice.reducer,
    },
});

export default store;