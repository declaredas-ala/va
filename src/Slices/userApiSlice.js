import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const AUTH_URL = "http://localhost:8080/api/auth";

// Action Types
export const SIGN_IN = "/signin";
export const SIGN_UP = "/signup";
export const LOGOUT = "/logout";

// Async Thunks
export const signInAsync = createAsyncThunk(SIGN_IN, async (userData) => {
  const response = await axios.post(`${AUTH_URL}/signin`, userData, {
    withCredentials: true,
  });
  console.log(response.data);
  return response.data;
});

export const signUpAsync = createAsyncThunk(SIGN_UP, async (userData) => {
  const response = await axios.post(`${AUTH_URL}/signup`, userData, {
    withCredentials: true,
  });
  return response.data;
});

export const logoutAsync = createAsyncThunk(LOGOUT, async () => {
  await axios.post(`${AUTH_URL}/logout`, null, { withCredentials: true });
});
export const UpdateProfile = createAsyncThunk(
  "userApi/UpdateProfile",
  async (formData) => {
    const response = await axios.put(
      "http://localhost:8080/api/update",
      formData,
      { withCredentials: true }
    );
    return response.data;
  }
);

const userApiSlice = createSlice({
  name: "userApi",
  initialState: {
    loading: false,
    error: null,
    user: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signInAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signInAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signInAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to sign in";
      })
      .addCase(signUpAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signUpAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(signUpAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to sign up";
      })
      .addCase(logoutAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutAsync.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      })
      .addCase(logoutAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to log out";
      })
      .addCase(UpdateProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(UpdateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update profile";
      });
  },
});

export default userApiSlice.reducer;
