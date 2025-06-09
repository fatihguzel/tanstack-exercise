import { configureStore } from "@reduxjs/toolkit";

// Slice
import userReducer from "@/reducers/user";

export const makeStore = () => configureStore({
  reducer: {
    user: userReducer,
  },
});