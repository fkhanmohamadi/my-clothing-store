import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSizesService } from "../../api/services/sizes";

export const fetchSizes = createAsyncThunk(
  'sizes/fetchList', 
  fetchSizesService
);

const sizesSlice = createSlice({
  name: 'Sizes/list',
  initialState: {
    data: [],
    status: 'idle',
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSizes.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(fetchSizes.rejected, (state) => {
        state.status = 'rejected';
      })
      .addCase(fetchSizes.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload;
      });
  },
});

export default sizesSlice.reducer;
