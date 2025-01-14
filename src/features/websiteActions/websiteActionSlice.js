import { createSlice } from "@reduxjs/toolkit";
import { websiteAction } from "../../enums/enums";

const initialState = {
  websiteAction: websiteAction.IDLE,
};
export const websiteActionSlice = createSlice({
  name: "websiteAction",
  initialState,
  reducers: {
    setWebsiteAction: (state, action) => {
      state.websiteAction = action.payload;
    },
  },
});

export const { setWebsiteAction } = websiteActionSlice.actions;
export default websiteActionSlice.reducer;
