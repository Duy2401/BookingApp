import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createAxiosInstance } from '../services/api';
import axios from 'axios';
// HOTELS
export const CreateHotel = createAsyncThunk(
  'hotels/create',
  async ({ newData, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post('/hotel/createhotel', newData, {
        headers: {
          token: `Bearer ${customers?.accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// SEARCH HOTELS
export const SearchHotels = createAsyncThunk(
  'hotels/searchhotel',
  async ({ keySearch }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/hotel/searchhotel/${keySearch}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const getDetailsHotel = createAsyncThunk(
  'hotels/getDetailsHotel',
  async ({ idHotel }, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/hotel/gethoteldetail/${idHotel}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
// GET ALL HOTEL OF PARTNER
export const GetAllHotelOfPartner = createAsyncThunk(
  'hotels/GetAllHotelOfPartner',
  async ({ customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.get(
        `/hotel/listhotels/${customers._id}`,
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
// ROOMS IN HOTELS
export const AddRoomsHotel = createAsyncThunk(
  'roomsType/Addrooms',
  async ({ newRooms, customers }, { rejectWithValue, dispatch }) => {
    try {
      const axiosInstance = createAxiosInstance(customers, dispatch);
      const response = await axiosInstance.post(
        '/hotel/createroomtype',
        newRooms,
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
export const GetTopRatedHotels = createAsyncThunk(
  'hotels/GetTopRatedHotels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/hotel/top-rated-hotels'
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
const hotelsSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: null,
    hotelsType: null,
    hoteldeitals: null,
    rooms: null,
    loading: false,
    error: null,
    success: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetTopRatedHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetTopRatedHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;
        state.success = true;
      })
      .addCase(GetTopRatedHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // GET DETAILS HOTELS
    builder
      .addCase(getDetailsHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getDetailsHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.hoteldeitals = action.payload.data;
        state.success = true;
      })
      .addCase(getDetailsHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // SEARCH HOTEL
    builder
      .addCase(SearchHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(SearchHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;
        state.success = true;
      })
      .addCase(SearchHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
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
    // GET HOTELTYPES
    builder
      .addCase(GetAllHotelOfPartner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(GetAllHotelOfPartner.fulfilled, (state, action) => {
        state.loading = false;
        state.hotels = action.payload.data;
        state.success = true;
      })
      .addCase(GetAllHotelOfPartner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // CREATE ROOMS
    builder
      .addCase(AddRoomsHotel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(AddRoomsHotel.fulfilled, (state, action) => {
        state.loading = false;
        state.rooms = action.payload.data;
        state.success = true;
      })
      .addCase(AddRoomsHotel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    // DELETE HOTEL
    // SEARCH HOTEL
    // EDIT HOTEL
  },
});
export default hotelsSlice.reducer;
