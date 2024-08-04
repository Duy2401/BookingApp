import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
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
export const getBooking = createAsyncThunk(
  "booking/getBooking",
  async (customers, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.get(
        `/booking/getbookings/${customers._id}`,
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
    bookings: null,
    bookingDetails: null,
    creatBooking: null,
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
        state.creatBooking = action.payload.data;
        state.success = true;
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
        state.success = true;
      })
      .addCase(getBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBookingDetails, clearBookingDetails } = bookingSlice.actions;

export default bookingSlice.reducer;
