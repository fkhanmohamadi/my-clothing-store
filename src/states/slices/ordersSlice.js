import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrderService } from "../../api/services/orders";

// thunk
export const fetchOrders = createAsyncThunk(
  "orders/fetchList",
  fetchOrderService
);

// slice
const ordersSlice = createSlice({
  name: "orders/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchOrders.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default ordersSlice.reducer;
