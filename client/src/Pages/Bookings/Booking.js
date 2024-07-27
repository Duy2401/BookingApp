import { useState } from "react";
import { useSelector } from "react-redux";
import BookingSummary from "./BookingSummary";
import PaymentForm from "./Payments/PaymentForm ";

const BookingPage = () => {
  const { bookingDetails, loading, error } = useSelector(
    (state) => state.booking
  );

  const handleSubmit = (formData) => {
    // Xử lý thông tin người dùng và gửi dữ liệu đến API hoặc server
    console.log(formData);
  };

  return (
    <div className="min-h-screen px-9 pt-2 mt-30 mx-44 font-Nunito">
      <div className="status">
        <ol class="flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block dark:after:border-gray-700">
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="flex flex-nowrap w-24">Personal Info</span>
            </span>
          </li>
          <li class="flex md:w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block dark:after:border-gray-700">
            <span class="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              <span class="flex flex-nowrap w-32">Details about you</span>
            </span>
          </li>
          <li class="flex items-center">
            <span class="me-2">3</span>
            Confirmation
          </li>
        </ol>
      </div>
      <div className="content mt-4 grid grid-cols-grid_col_2B">
        <div className="max-w-2xl w-full">
          <BookingSummary bookingDetails={bookingDetails} />
        </div>
        <div className="ml-2">
          <PaymentForm handleSubmit={handleSubmit} />
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
