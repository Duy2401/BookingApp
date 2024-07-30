import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BookingSummary from "../BookingSummary";
import { handleBookRoom } from "../../../redux/paymentSlice";
import { createBooking } from "../../../redux/bookingsSlice";

const PaymentDetail = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const { bookingDetails, loading, error } = useSelector(
    (state) => state.booking
  );

  const [paymentMethod, setPaymentMethod] = useState(null); // Track selected payment method

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

  const handlePayment = () => {
    if (paymentMethod === "online") {
      dispatch(
        createBooking({ bookingDetails: modifiedBookingDetails, customers })
      ).catch((err) => {
        console.error("Error processing online payment:", err);
      });
    } else if (paymentMethod === "cash") {
      dispatch(
        handleBookRoom({ bookingDetails: modifiedBookingDetails, customers })
      ).catch((err) => {
        console.error("Error processing cash payment:", err);
      });
    } else {
      console.error("Please select a payment method");
    }
  };

  return (
    <div className="min-h-screen px-9 pt-2 mt-30 mx-44 font-Nunito">
      <div className="status">
        <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="flex flex-nowrap w-24">Personal Info</span>
            </span>
          </li>
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span className="flex flex-nowrap w-32">Details about you</span>
            </span>
          </li>
          <li className="flex items-center text-blue-600 dark:text-blue-500">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
            </span>
            Confirmation
          </li>
        </ol>
      </div>
      <div className="content mt-4 grid grid-cols-grid_col_2B">
        <div className="max-w-2xl w-full">
          <BookingSummary bookingDetails={bookingDetails} />
        </div>
        <div className="ml-2">
          <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
            <h2 className="text-2xl font-bold mb-4">Thanh toán</h2>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setPaymentMethod("online")}
                className={`w-full text-center block ${
                  paymentMethod === "online" ? "bg-blue-700" : "bg-blue-500"
                } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
              >
                Thanh toán online
              </button>
              <button
                onClick={() => setPaymentMethod("cash")}
                className={`w-full text-center block ${
                  paymentMethod === "cash" ? "bg-blue-700" : "bg-blue-500"
                } text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors`}
              >
                Thanh toán bằng tiền mặt
              </button>
            </div>
            <button
              onClick={handlePayment}
              className="w-full mt-4 text-center block bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
            >
              Xác nhận thanh toán
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetail;
