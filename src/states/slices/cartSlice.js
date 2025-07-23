import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addToCartService } from "../../api/services/addToCart";
import { fetchCartService } from "../../api/services/cart";
import { removeFromCartService } from "../../api/services/removeFromCart";
import { updateCartItemService } from "../../api/services/updateCartItem";

export const addToCart = createAsyncThunk("cart/addToCart", addToCartService);
export const fetchCart = createAsyncThunk("cart/fetchCart", fetchCartService);
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  removeFromCartService
);

export const updateCartItem = createAsyncThunk(
  "cart/updateCartItem",
  updateCartItemService
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      // ===== addToCart =====
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
      })
      // ===== fetchCart =====
      .addCase(fetchCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      })
      // ===== removeFromCart =====
      .addCase(removeFromCart.pending, (state) => {
        state.status = "pending";
      })
      .addCase(removeFromCart.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.status = "success";
        state.data = state.data.filter(
          (item) => item.id !== action.payload.itemId
        );
      })
      // ===== updateCartItem =====
      .addCase(updateCartItem.pending, (state) => {
        state.status = "pending";
      })
      .addCase(updateCartItem.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.status = "success";
        const index = state.data.findIndex(
          (item) => item.id === action.payload.id
        );
        if (index >= 0) {
          state.data[index] = action.payload;
        }
      });
  },
});

export default cartSlice.reducer;
