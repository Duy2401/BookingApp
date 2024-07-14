import { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField/InputField";
function AccountInfor() {
  const customers = useSelector((state) => state.customers?.customers);

  const [formData, setFormData] = useState({
    customer_name: customers?.customer_name || "",
    customer_email: customers?.customer_email || "",
    phone_number: customers?.phone_number || "",
    date_of_birth: customers?.date_of_birth || "",
    gender: customers?.gender || "",
    address: customers?.address || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div>
      <div className="header mb-4">
        <h1 className="text-5xl font-black">Thông tin cá nhân</h1>
        <h3 className="mt-4 text-gray-500">
          Cập nhật thông tin của bạn và tìm hiểu các thông tin này được sử dụng
          ra sao.
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Tên người dùng"
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
        />
        <InputField
          label="Địa chỉ email"
          type="email"
          name="customer_email"
          value={formData.customer_email}
          onChange={handleChange}
        />
        <InputField
          label="Số điện thoại"
          type="text"
          name="phone_number"
          value={formData.phone_number}
          onChange={handleChange}
        />
        <InputField
          label="Ngày sinh"
          type="date"
          name="date_of_birth"
          value={formData.date_of_birth}
          onChange={handleChange}
        />
        <InputField
          label="Giới tính"
          type="text"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
        />
        <InputField
          label="Địa chỉ"
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
        />

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
        >
          Lưu thông tin
        </button>
        <button
          type="reset"
          className="mr-4 text-white bg-gray-400 hover:bg-gray-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 float-right"
        >
          Hủy
        </button>
      </form>
    </div>
  );
}
export default AccountInfor;
