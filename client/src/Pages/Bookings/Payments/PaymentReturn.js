import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const VnpayReturn = () => {
  const location = useLocation();
  const [codePayment, setCodePayment] = useState('');
  useEffect(() => {
    const checkPaymentStatus = async () => {
      try {
        const params = new URLSearchParams(location.search);
        const response = await axios.get(
          'http://localhost:8000/api/payment/vnpay_return',
          {
            params,
          }
        );
        const { status, message, code } = response.data;
        setCodePayment(code);
        // Xử lý khi thanh toán thành công hoặc thất bại
        if (status) {
          console.log('Payment success:', code, message);
        } else {
          console.log('Payment failure:', message, 'Code:', code);
        }
      } catch (error) {
        console.error('Error checking payment status:', error);
      }
    };

    checkPaymentStatus();
  }, [location]);

  return (
    <div className="text-center my-10">
      <div className="mb-5">Processing payment...</div>
      {codePayment === '00' ? (
        <button className="bg-green-100 text-green-800 text-lg font-medium me-2 p-7 my-10 rounded dark:bg-green-900 dark:text-green-300">
          Đã thanh toán thành công
        </button>
      ) : (
        <button className="bg-red-100 text-red-800 text-lg font-medium me-2 p-7 my-10  rounded dark:bg-red-900 dark:text-red-300">
          Thanh toán không thành công
        </button>
      )}
    </div>
  );
};

export default VnpayReturn;
