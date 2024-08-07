import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchClasses = createAsyncThunk(
  "classes/fetchClasses",
  async () => {
    const response = await axios.get("http://localhost:5000/classes");
    return response.data;
  }
);

export const fetchStudents = createAsyncThunk(
  "classes/fetchStudents",
  async (classId) => {
    const token = sessionStorage.getItem("token");
    const response = await axios.get(
      `http://localhost:5000/enrollments/class/${classId}/students`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  }
);

const classSlice = createSlice({
  name: "classes",
  initialState: {
    classes: [],
    selectedClass: {},
    students: [],
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedClassId(state, action) {
      state.selectedClass =
        state.classes.find((cls) => cls._id === action.payload) || {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClasses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchClasses.fulfilled, (state, action) => {
        state.loading = false;
        state.classes = action.payload;
      })
      .addCase(fetchClasses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchStudents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.loading = false;
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setSelectedClassId } = classSlice.actions;

export default classSlice.reducer;
