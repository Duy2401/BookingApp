import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const CustomerLogin = createAsyncThunk(
  "customer/login",
  async (customerAccount, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/login",
        customerAccount,
        {
          withCredentials: true, // Đảm bảo rằng cookie được gửi cùng với yêu cầu
        }
      );
      return response.data;
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      }
    }
  }
);
export const CustomerRegister = createAsyncThunk(
  "customer/register",
  async (customerAccount, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/register",
        customerAccount
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const customersSlice = createSlice({
  name: "customers",
  initialState: {
    customers: null,
    loading: false,
    error: null,
    success: false,
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
        state.success = true;
      })
      .addCase(CustomerLogin.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
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
        state.success = true;
      })
      .addCase(CustomerRegister.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default customersSlice.reducer;
