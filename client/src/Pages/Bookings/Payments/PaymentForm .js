import React, { useState } from "react";
import Button from "../../../components/Button/button";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const PaymentForm = ({ handleSubmit }) => {
  const navigate = useNavigate();
  const customers = useSelector((state) => state.customers?.customers);
  const [formData, setFormData] = useState({
    fullName: customers?.customer_name || "",
    email: customers?.customer_email || "",
    phone: customers?.customer_phone || "",
    region: "Việt Nam",
    additionalRequests: "",
    arrivalTime: "",
  });

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
          <label className="block text-gray-700">Tên Đầy Đủ(tiếng Anh) *</label>
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
          <label className="block text-gray-700">Địa chỉ email *</label>
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
            Điện thoại (ưu tiên số ĐTDĐ) *
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
          <label className="block text-gray-700">Vùng/quốc gia *</label>
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
          <label className="block text-gray-700">Thời gian đến của bạn *</label>
          <input
            type="text"
            name="arrivalTime"
            value={formData.arrivalTime}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
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
          <label className="block text-gray-700">
            Xem lại các quy tắc chung
          </label>
          <p>
            Xem lại quy tắc chung Chủ chỗ nghỉ muốn bạn đồng ý với các quy tắc
            chung này:
            <p className="ml-1">Thời gian yên lặng từ 22:00 đến 06:00</p>
            <p className="ml-1">
              Không cho phép thú cưng Khi tiếp tục các bước tiếp theo
            </p>
            <p>Bạn đồng ý với các quy tắc chung này.</p>
          </p>
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
