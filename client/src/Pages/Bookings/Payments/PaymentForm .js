import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBookingDetails } from "../../../redux/bookingsSlice";
const PaymentForm = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const { bookingDetails, loading, error } = useSelector(
    (state) => state.booking
  );
  const [formData, setFormData] = useState({
    fullName: customers?.customer_name || "",
    email: customers?.customer_email || "",
    phone: customers?.customer_phone || "",
    region: "Việt Nam",
    additionalRequests: "",
    arrivalTime: "",
  });
  const modifiedBookingDetails = {
    ...bookingDetails,
    customer_note: formData.additionalRequests,
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (customers === null) {
      toast.error("Vui lòng đăng nhập và ứng dụng");
    } else {
      dispatch(setBookingDetails(modifiedBookingDetails));
      navigate("/payment");
    }
    handleSubmit(formData);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg border-2">
      <ToastContainer icon={true} />
      <h2 className="text-2xl font-bold mb-4">
        Nhập thông tin chi tiết của bạn
      </h2>
      <form onSubmit={onSubmit} className="block">
        <div className="mb-4">
          <label className="block text-gray-700">
            Tên Đầy Đủ <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Địa chỉ email <span className="text-red-600">*</span>
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Điện thoại (ưu tiên số ĐTDĐ) <span className="text-red-600">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">
            Vùng/quốc gia <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required=""
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thời gian đến của bạn </label>
          <input
            type="text"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Các yêu cầu đặc biệt</label>
          <textarea
            name="additionalRequests"
            value={formData.additionalRequests}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label className="block font-extrabold text-xl mb-2">
            Xem lại các quy tắc chung
          </label>
          <p className="underline">
            Xem lại quy tắc chung Chủ chỗ nghỉ muốn bạn đồng ý với các quy tắc
            chung này:
          </p>
          {bookingDetails?.booking_reference?.map((hotel) =>
            hotel.hotel_description.description_note?.map((note, index) => (
              <p className="ml-1 my-4 italic" key={index}>
                {note.note_content}
              </p>
            ))
          )}
          <p className="underline">Bạn đồng ý với các quy tắc chung này.</p>
        </div>
        <button
          type="submit"
          className="w-full text-center block bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Chi tiết cuối cùng
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
