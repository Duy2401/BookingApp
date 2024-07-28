import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../services/api";
import axios from "axios";
export const initiateVNPayPayment = createAsyncThunk(
  "payment/initiateVNPayPayment",
  async (bookingDetails, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/payment/vnpay",
        bookingDetails,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error initiating VNPay payment:", error);
      return rejectWithValue(
        error.response ? error.response.data : "Unknown error"
      );
    }
  }
);

// Action to handle booking rooms
export const handleBookRoom = (bookingDetails) => async (dispatch) => {
  try {
    console.log("Booking details:", bookingDetails);
    const modifiedBookingDetails = {
      ...bookingDetails,
      hotelId: Array.isArray(bookingDetails.hotelId)
        ? bookingDetails.hotelId[0]._id
        : bookingDetails.hotelId._id,
      rooms: bookingDetails.rooms.map((room) => ({
        roomType: room.roomId,
        price: room.price,
        quantity: room.quantity,
      })),
    };

    const result = await dispatch(
      initiateVNPayPayment(modifiedBookingDetails)
    ).unwrap();
    if (result.paymentUrl) {
      window.location.href = result.paymentUrl;
    } else {
      console.error("No payment URL received");
    }
  } catch (error) {
    console.error("Error initiating payment:", error);
  }
};
const paymentSlice = createSlice({
  name: "payment",
  initialState: {
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
  },
});
export default paymentSlice.reducer;
