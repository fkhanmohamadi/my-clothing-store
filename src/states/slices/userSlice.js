import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserService } from "../../api/services/addUser";

export const addUser = createAsyncThunk("user/addUers", addUserService);

const userSlice = createSlice({
  name: "user/addUers",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addUser.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addUser.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.status = "success";
        state.data.push(action.payload);
      });
  },
});

export default userSlice.reducer;
