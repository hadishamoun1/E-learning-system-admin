import { configureStore } from "@reduxjs/toolkit";
import classReducer from "./slices/classSlice";
import authReducer from "./slices/authSlice";
import uploadReducer from "./slices/uploadSlice";

const store = configureStore({
  reducer: {
    classes: classReducer,
    auth: authReducer,
    upload: uploadReducer,
  },
});

export default store;
