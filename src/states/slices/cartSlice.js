import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartService } from "../../api/services/addToCart";

export const addToCart = createAsyncThunk("cart/addToCart", addToCartService);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(addToCart.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.status = "success";
        const existingIndex = state.data.findIndex(
          (item) =>
            item.productid === action.payload.productid &&
            item.colorId === action.payload.colorId &&
            item.sizeId === action.payload.sizeId &&
            item.userid === action.payload.userid
        );
        if (existingIndex >= 0) {
          state.data[existingIndex] = action.payload;
        } else {
          state.data.push(action.payload);
        }
      });
  },
});

export default cartSlice.reducer;
