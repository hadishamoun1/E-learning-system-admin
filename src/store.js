import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./slices/classSlice";
import authReducer from "./slices/authSlice";

const store = configureStore({
  reducer: {
    classes: classReducer,
    auth: authReducer,
  },
});

export default store;
