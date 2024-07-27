import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "../services/api";

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
export const LogoutAccount = createAsyncThunk(
  "customer/logout",
  async ({ customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post("/auth/logout", customers._id, {
        headers: { token: `Bearer ${customers?.accessToken}` },
      });
      localStorage.clear();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
export const EditProfileUser = createAsyncThunk(
  "customer/edit",
  async (
    { customers, newCustomers, iduser },
    { rejectWithValue, dispatch }
  ) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.put(
        `/user/edit/${iduser}`,
        newCustomers,
        {
          headers: { token: `Bearer ${customers?.accessToken}` },
        }
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
  reducers: {
    setTokens: (state, action) => {
      if (state.customers) {
        state.customers.accessToken = action.payload.accessToken;
      }
    },
  },
  extraReducers: (builder) => {
    // LOGIN
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

    // REGISTER
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
    // LOGOUT
    builder
      .addCase(LogoutAccount.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(LogoutAccount.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = null;
      })
      .addCase(LogoutAccount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // EDIT
    builder
      .addCase(EditProfileUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(EditProfileUser.fulfilled, (state, action) => {
        state.loading = false;
        state.customers = action.payload.data;
        state.success = true;
      })
      .addCase(EditProfileUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export const { setTokens } = customersSlice.actions;
export default customersSlice.reducer;
