import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCategoryService } from "../../api/services/category";

// thunk
export const fetchCategory = createAsyncThunk(
  "Category/fetchList",
  fetchCategoryService
);

// slice
const categorySlice = createSlice({
  name: "Category/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCategory.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default categorySlice.reducer;
