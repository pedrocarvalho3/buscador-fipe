import { createSlice } from "@reduxjs/toolkit";

const historySlice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    addHistory: (state, action) => {
      state.push(action.payload);
    },
    setHistory: (state, action) => {
      return action.payload;
    },
  },
});

export const { addHistory, setHistory } = historySlice.actions;
export default historySlice.reducer;
