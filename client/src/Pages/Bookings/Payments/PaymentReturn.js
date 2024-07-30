// VnpayReturn.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleVNPayIPNResponse } from "../../../redux/paymentSlice";
const VnpayReturn = () => {
  const dispatch = useDispatch();
  const { data, error } = useSelector((state) => state.payment);

  useEffect(() => {
    // Extract query parameters from URL
    const queryParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(queryParams.entries());

    // Dispatch action to handle VNPay IPN response
    dispatch(handleVNPayIPNResponse(params));
  }, [dispatch]);
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (data) {
    return (
      <div>
        <h1>Payment Status</h1>
        <p>Response Code: {data.RspCode}</p>
        <p>Message: {data.Message}</p>
      </div>
    );
  }

  return <div>Loading...</div>;
};

export default VnpayReturn;
