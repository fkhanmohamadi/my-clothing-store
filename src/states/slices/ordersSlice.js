import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchOrderService } from "../../api/services/orders";
import { addToOrderService } from "../../api/services/addToOrders";

// thunk
export const fetchOrders = createAsyncThunk(
  "orders/fetchList",
  fetchOrderService
);

export const addToOrders = createAsyncThunk(
  "orders/addToOrder",
  addToOrderService
);

// slice
const ordersSlice = createSlice({
  name: "orders",
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
      })
      .addCase(addToOrders.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToOrders.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(addToOrders.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default ordersSlice.reducer;
