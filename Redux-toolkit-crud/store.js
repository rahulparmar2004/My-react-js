import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/userslice";

export const store = configureStore({
  reducer: {
    users: userReducer,
  },
});
