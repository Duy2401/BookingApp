import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAxiosInstance } from '../services/api';

// Thunk for initiating VNPay payment
export const initiateVNPayPayment = createAsyncThunk(
  'payment/initiateVNPayPayment',
  async ({ bookingDetails, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post(
        '/payment/momo-payment',
        bookingDetails,
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );
      return response.data;
    } catch (error) {
      console.error('Error initiating VNPay payment:', error);
      return rejectWithValue(
        error.response ? error.response.data : 'Unknown error'
      );
    }
  }
);

// Action to handle booking rooms
export const handleBookRoom =
  ({ bookingDetails, customers }) =>
  async (dispatch) => {
    try {
      const result = await dispatch(
        initiateVNPayPayment({ bookingDetails, customers })
      ).unwrap();
      if (result) {
        window.location.href = result;
      } else {
        console.error('No payment URL received');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
    }
  };
export const getAllPayment = createAsyncThunk(
  'payment/getAllPayment',
  async ({ hotelID, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.get(`/payment/revenue/${hotelID}`, {
        headers: {
          token: `Bearer ${customers?.accessToken}`,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : 'Unknown error'
      );
    }
  }
);
// Payment slice definition
const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    payments: [],
    loading: false,
    paymentUrl: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(initiateVNPayPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initiateVNPayPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentUrl = action.payload.paymentUrl;
      })
      .addCase(initiateVNPayPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getAllPayment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.payments = action.payload.data;
      })
      .addCase(getAllPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default paymentSlice.reducer;
