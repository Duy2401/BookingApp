import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { createAxiosInstance } from "../services/api";

export const createBooking = createAsyncThunk(
  "booking/createBooking",
  async ({ bookingDetails, customers }, { rejectWithValue, dispatch }) => {
    try {
      console.log(bookingDetails);
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post(
        "/booking/createbookings",
        bookingDetails,
        {
          headers: {
            token: `Bearer ${customers?.accessToken}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const bookingSlice = createSlice({
  name: "booking",
  initialState: {
    bookingDetails: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {
    setBookingDetails: (state, action) => {
      state.bookingDetails = action.payload;
    },
    clearBookingDetails: (state) => {
      state.bookingDetails = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookingDetails = action.payload.data;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBookingDetails, clearBookingDetails } = bookingSlice.actions;

export default bookingSlice.reducer;
