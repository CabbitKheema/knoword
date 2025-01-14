import { createSlice } from "@reduxjs/toolkit";
import { inputType } from "../../enums/enums";

const initialState = {
  currentInput: inputType.NONE,
};
export const inputSelectionSlice = createSlice({
  name: "inputSelection",
  initialState,
  reducers: {
    setInputType: (state, action) => {
      state.currentInput = action.payload;
    },
  },
});

export const { setInputType } = inputSelectionSlice.actions;
export default inputSelectionSlice.reducer;
