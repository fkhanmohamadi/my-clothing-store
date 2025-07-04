import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCompanyServicesService } from "../../api/services/companyServices";

// thunk
export const fetchCompanyService = createAsyncThunk(
  "CompanyService/fetchList",
  fetchCompanyServicesService
);

// slice
const CompanyServiceSlice = createSlice({
  name: "CompanyService/list",
  initialState: {
    data: [],
    status: "idle",
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyService.pending, (state) => {
        state.status = "pending";
      })
      .addCase(fetchCompanyService.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(fetchCompanyService.fulfilled, (state, action) => {
        state.status = "success";
        state.data = action.payload;
      });
  },
});

export default CompanyServiceSlice.reducer;
