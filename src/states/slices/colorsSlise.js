import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchColorsService } from "../../api/services/colors";

// thunk
export const fetchColors = createAsyncThunk(
  "colors/fetchList",
  fetchColorsService
);

// slice
const colorsSlice = createSlice({
  name: "colors/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchColors.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchColors.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchColors.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default colorsSlice.reducer;
