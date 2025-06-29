import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchcategorySubcategoryRelService } from "../../api/services/categorySubcategoryRel";

// thunk
export const fetchcategorySubcategoryRel = createAsyncThunk(
  "categorySubcategoryRel/fetchList",
  fetchcategorySubcategoryRelService
);

// slice
const categorySubcategoryRelSlice = createSlice({
  name: "categorySubcategoryRel/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchcategorySubcategoryRel.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchcategorySubcategoryRel.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchcategorySubcategoryRel.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default categorySubcategoryRelSlice.reducer;
