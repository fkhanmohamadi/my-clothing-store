import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addUserService } from "../../api/services/addUser";
import { fetchUsersService } from "../../api/services/users";

export const addUser = createAsyncThunk("user/addUers", addUserService);
export const fetchUsers = createAsyncThunk("user/fetchUers", fetchUsersService);

const userSlice = createSlice({
  name: "users",
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
      })
      .addCase(fetchUsers.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchUsers.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "success";
        state.data = (action.payload);
      });
  },
});

export default userSlice.reducer;
