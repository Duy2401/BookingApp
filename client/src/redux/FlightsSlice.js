import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../services/api";
import axios from "axios";
// HOTELS
export const CreateFlight = createAsyncThunk(
  "flights/create",
  async ({ newData, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post(
        "/flight/createflight",
        newData,
        {
          headers: {
            token: `Bearer ${customers?.accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const flightsSlice = createSlice({
  name: "flights",
  initialState: {
    flights: null,
    flightsType: null,
    flightsdeitals: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // GET DETAILS HOTELS
    builder
      .addCase(CreateFlight.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateFlight.fulfilled, (state, action) => {
        state.loading = false;
        state.hoteldeitals = action.payload.data;
        state.success = true;
      })
      .addCase(CreateFlight.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});
export default flightsSlice.reducer;
