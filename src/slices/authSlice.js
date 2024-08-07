import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: sessionStorage.getItem('token') || '',
    error: '',
  },
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload;
      sessionStorage.setItem('token', action.payload);
    },
    loginFailure: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = '';
      sessionStorage.removeItem('token');
    },
  },
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;

export default authSlice.reducer;
