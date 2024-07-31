import { useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField/InputField";
function Secure() {
  const customers = useSelector((state) => state.customers?.customers);

  const [formData, setFormData] = useState({
    customer_name: customers?.customer_name || "",
    customer_email: customers?.customer_email || "",
    customer_password: customers?.customer_password || "",
    phone_number: customers?.phone_number || "",
    date_of_birth: customers?.date_of_birth || "",
    gender: customers?.gender || "",
    customer_address: customers.customer_address || "",
  });
  console.log(customers);
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
        <h1 className="text-5xl font-black">An toàn và Bảo mật</h1>
        <h3 className="mt-4 text-gray-500">
          Thay đổi thiết lập bảo mật, cài đặt xác thực bổ sung hoặc xóa tài
          khoản của Quý vị.
        </h3>
      </div>
      <form onSubmit={handleSubmit}>
        <InputField
          label="Mật Khẩu"
          type="password"
          name="customer_name"
          value={formData.customer_password}
          onChange={handleChange}
        />
        <InputField
          label="Địa chỉ"
          type="text"
          name="customer_address"
          value={formData.customer_address}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
export default Secure;
