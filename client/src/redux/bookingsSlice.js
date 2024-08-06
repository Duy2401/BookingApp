import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAxiosInstance } from '../services/api';

export const createBooking = createAsyncThunk(
  'booking/createBooking',
  async ({ bookingDetails, customers }, { rejectWithValue, dispatch }) => {
    try {
      console.log(bookingDetails);
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post(
        '/booking/createbookings',
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
export const getBookingOfCustomer = createAsyncThunk(
  'booking/getBookingOfCustomer',
  async (customers, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.get(
        `/booking/getbookingofcustomer/${customers._id}`,
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
export const getBookingOfHotel = createAsyncThunk(
  'booking/getBookingOfHotel',
  async ({ hotelID, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.get(
        `/booking/getbookingofhotel/${hotelID}`,
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

export const UpdateBooking = createAsyncThunk(
  'booking/updateBookings',
  async ({ bookingID, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.get(
        `/booking/updateBookings/${bookingID}`,
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
  name: 'booking',
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
      .addCase(getBookingOfHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingOfHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
        state.success = true;
      })
      .addCase(getBookingOfHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(getBookingOfCustomer.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getBookingOfCustomer.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload.data;
        state.success = true;
      })
      .addCase(getBookingOfCustomer.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    builder
      .addCase(UpdateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(UpdateBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.creatBooking = action.payload.data;
        state.success = true;
      })
      .addCase(UpdateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setBookingDetails, clearBookingDetails } = bookingSlice.actions;

export default bookingSlice.reducer;
