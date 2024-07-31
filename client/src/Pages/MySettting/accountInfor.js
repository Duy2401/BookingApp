import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField/InputField";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { EditProfileUser } from "../../redux/customersSlice";
import { toast, ToastContainer } from "react-toastify";
function AccountInfor() {
  const id = useParams();
  const dispatch = useDispatch();
  const idUser = id.iduser.slice(7);
  const customers = useSelector((state) => state.customers?.customers);
  useEffect(() => {
    setFormData(initialFormData);
  }, []);
  const initialFormData = {
    customer_name: customers?.customer_name || "",
    customer_gender: customers?.customer_gender || "",
    customer_phone: customers?.customer_phone || "",
    customer_address: customers?.customer_address || "",
    customer_email: customers?.customer_email || "",
    customer_dateOfBirth: customers?.customer_dateOfBirth || "",
  };

  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await dispatch(
        EditProfileUser({ customers, newCustomers: formData, iduser: idUser })
      );
      if (data.payload.status)
        return toast.success("Thay đổi thông tin thành công");
      if (!data.payload.status)
        return toast.success("Thay đổi thông tin thất bại");
      return data;
    } catch (error) {}
  };
  return (
    <div>
      <div className="header mb-4">
        <ToastContainer icon={true} />
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
          readonly="readonly"
          value={formData.customer_email}
          onChange={handleChange}
          disabled
        />
        <InputField
          label="Số điện thoại"
          type="text"
          name="customer_phone"
          value={formData.customer_phone}
          onChange={handleChange}
        />
        <InputField
          label="Ngày sinh"
          type="date-time"
          name="customer_dateOfBirth"
          value={formData.customer_dateOfBirth}
          onChange={handleChange}
        />
        <InputField
          label="Giới tính"
          type="text"
          name="customer_gender"
          value={formData.customer_gender}
          onChange={handleChange}
        />
        <InputField
          label="Địa chỉ"
          type="text"
          name="customer_address"
          value={formData.customer_address}
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
