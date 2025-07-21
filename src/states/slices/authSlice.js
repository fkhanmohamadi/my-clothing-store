import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { loginService } from "../../api/services/auth";

// thunk برای login
export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (data, { rejectWithValue }) => {
    try {
      const result = await loginService(data);
      localStorage.setItem("token", result.accessToken);
      localStorage.setItem("refresh_token", result.refreshToken);
      localStorage.setItem("user", JSON.stringify(result.user));
      return result.user;
    } catch (error) {
      return rejectWithValue(error.response?.data || "خطا در ورود");
    }
  }
);


const initialState = {
  userInfo: JSON.parse(localStorage.getItem("user")) || null,
  isLoggedIn: !!localStorage.getItem("token"),
  status: "idle",
  error: null,
};

const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem("token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
      state.userInfo = null;
      state.isLoggedIn = false;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.status = "pending";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "success";
        state.userInfo = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "rejected";
        state.error = action.payload;
      });
  },
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
