import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CustomerLogin = createAsyncThunk(
  "customer/login",
  async (customerAccount) => {
    const response = await axios.post(
      "http://localhost:8000/api/auth/login",
      customerAccount
    );
    return response.data;
  }
);
export const CustomerRegister = createAsyncThunk(
  "customer/register",
  async (customerAccount) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        customerAccount
      );
      return { status: response.status, data: response.data };
    } catch (error) {
      return {
        status: error.response ? error.response.status : 500,
        message: error.response ? error.response.data.message : "Network Error",
      };
    }
  }
);
const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: null,
    loading: false,
    status: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // CUSTOMER LOGIN
    builder
      .addCase(CustomerLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CustomerLogin.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.status = action.payload.status;
      })
      .addCase(CustomerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.status = action.payload.status;
      });

    // REGISTER ACCOUNT CUSTOMER
    builder
      .addCase(CustomerRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CustomerRegister.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.status = action.payload.message;
      })
      .addCase(CustomerRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
        state.status = action.payload.status;
      });
  },
});

export default customersSlice.reducer;
