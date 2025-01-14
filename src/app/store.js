import { configureStore } from "@reduxjs/toolkit";
import textResultReducer from "../features/searchword/textResultSlice";
import inputSelectionReducer from "../features/selectInputType/inputSelectionSlice";
import websiteActionReducer from "../features/websiteActions/websiteActionSlice";

export const store = configureStore({
  reducer: {
    textResultReducer,
    inputSelectionReducer,
    websiteActionReducer,
  },
});
