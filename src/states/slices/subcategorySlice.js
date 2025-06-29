import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSubcategoryService } from "../../api/services/subcategory";

export const fetchSubcategory = createAsyncThunk(
  "Subcategory/fetchList",
  fetchSubcategoryService
);

const subcategorySlice = createSlice({
  name: "Subcategory/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubcategory.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchSubcategory.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchSubcategory.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
        
      });
  },
});

export default subcategorySlice.reducer;
