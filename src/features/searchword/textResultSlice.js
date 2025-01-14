import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  textResult: "",
};
export const textResultSlice = createSlice({
  name: "textResult",
  initialState,
  reducers: {
    setTextResult: (state, action) => {
      state.textResult = action.payload;
    },
    clearTextResult: (state) => {
      state.textResult = "";
    },
  },
});

export const { setTextResult, clearTextResult } = textResultSlice.actions;
export default textResultSlice.reducer;
