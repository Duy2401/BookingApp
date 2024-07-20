import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createAxiosInstance } from "../services/api";
import axios from "axios";

export const CreateHotel = createAsyncThunk(
  "hotels/create",
  async ({ newData, customers }, { rejectWithValue, dispatch }) => {
    try {
      console.log(newData);
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post("/hotel/createhotel", newData, {
        headers: {
          token: `Bearer ${customers?.accessToken}`,
          "Content-Type": "multipart/form-data",
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
export const EditHotel = createAsyncThunk({});
export const DeleteHotel = createAsyncThunk({});
export const GetHotel = createAsyncThunk({});

const hotelsSlice = createSlice({
  name: "hotels",
  initialState: {
    hotels: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // CREATE HOTEL
    builder
      .addCase(CreateHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(CreateHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;
        state.success = true;
      })
      .addCase(CreateHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // GET HOTEL
    // DELETE HOTEL
    // SEARCH HOTEL
    // EDIT HOTEL
  },
});
export default hotelsSlice.reducer;
