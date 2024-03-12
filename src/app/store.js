import { configureStore } from "@reduxjs/toolkit";
import tabularDataReducer from "../AppSlice";
export const store = configureStore({
  reducer: {
    data: tabularDataReducer,
  },
});
