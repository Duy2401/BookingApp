import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import customersReducer from "./customersSlice";
import hotelsSlice from "./hotelsSlice";
import bookingsSlice from "./bookingsSlice";
import paymentSlice from "./paymentSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  customers: customersReducer,
  hotels: hotelsSlice,
  booking: bookingsSlice,
  payment: paymentSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);
