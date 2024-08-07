// src/slices/uploadSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Define async thunk and slice
export const uploadFile = createAsyncThunk(
  "upload/uploadFile",
  async (file, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`, // Adjust as needed
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Upload failed:", error.response);
      return rejectWithValue(
        error.response.data.message || "An unknown error occurred"
      );
    }
  }
);

const uploadSlice = createSlice({
  name: "upload",
  initialState: {
    file: null,
    loading: false,
    success: null,
    error: null,
  },
  reducers: {
    clearUploadState(state) {
      state.file = null;
      state.success = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.success = action.payload.message;
        state.file = action.payload.file;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearUploadState } = uploadSlice.actions;

export default uploadSlice.reducer;
