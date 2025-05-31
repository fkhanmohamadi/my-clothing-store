import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBrandsService } from "../../api/services/brands";

// thunk
export const fetchBrands = createAsyncThunk(
  "Brands/fetchList",
  fetchBrandsService
);

// slice
const brandsSlice = createSlice({
  name: "Brands/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchBrands.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default brandsSlice.reducer;
