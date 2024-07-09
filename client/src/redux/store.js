import { configureStore } from "@reduxjs/toolkit";
import CustomerLogin from "./customersSlice";
const store = configureStore({
  reducer: {
    customers: CustomerLogin,
  },
});

export default store;
