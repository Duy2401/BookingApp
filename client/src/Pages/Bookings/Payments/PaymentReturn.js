import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const VnpayReturn = () => {
  const location = useLocation();

  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const response = await axios.get(
          "http://localhost:8000/api/payment/vnpay_return",
          {
            params,
          }
        );
        const { status, message, code } = response.data;
        // Xử lý khi thanh toán thành công hoặc thất bại
        if (status) {
          console.log("Payment success:", message);
        } else {
          console.log("Payment failure:", message, "Code:", code);
        }
      } catch (error) {
        console.error("Error checking payment status:", error);
      }
    };

    checkPaymentStatus();
  }, [location]);

  return <div>Processing payment...</div>;
};

export default VnpayReturn;
