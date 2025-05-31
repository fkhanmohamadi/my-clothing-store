import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchProductService } from "../../api/services/Products";

export const fetchProducts = createAsyncThunk(
  "products/fetchList",
  fetchProductService
);

const productsSlice = createSlice({
  name: "products/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default productsSlice.reducer;
