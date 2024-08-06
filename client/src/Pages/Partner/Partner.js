import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Button from '../../components/Button/button';
import { useSelector, useDispatch } from 'react-redux';
import { RegisterPartner } from '../../redux/customersSlice';
import { toast } from 'react-toastify';
function Partner() {
  const [email, setEmail] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const toggleForm = () => {
    setIsOpen(!isOpen);
  };
  const handleChangeRole = async () => {
    const response = await dispatch(RegisterPartner({ customers }));
    if (response.payload.status === true) {
      toast.success('Đăng ký đối tác thành công');
    } else {
      toast.warning('Đăng ký đối tác không thành công');
    }
    console.log(response.payload.data);
  };

  return (
    <>
      <div className="p-4">
        {customers?.isRole === 3 && (
          <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              ĐĂNG KÝ ĐỐI TÁC VÀ KHAI THÁC DỊCH VỤ
            </h1>
            <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Các dịch vụ bạn có thể đăng ký
              </h2>
              <ul className="ml-2">
                <li className="text-gray-700 mb-8 text-xl">
                  Đăng ký dịch vụ cho thuê khách sạn
                </li>
                <li className="text-gray-700 mb-8 text-xl">
                  Đăng ký dịch vụ cho đặt chuyến đi
                </li>
              </ul>
              <Button
                to={!customers ? '/register' : '#'}
                className="bg-blue-700 text-white p-3 text-xl rounded text-center"
                onClick={customers && toggleForm}
              >
                Đăng ký ngay
              </Button>
              {isOpen && (
                <div className="mt-7">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    <strong className="text-red-800 mr-1">*</strong>Your email
                  </label>
                  <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Bạn đã có email xác nhận để đăng ký ngay
                  </label>
                  <div className="flex items-center">
                    <input
                      type="email"
                      value={customers.customer_email || email}
                      onChange={handleEmailChange}
                      className="bg-gray-50 border w-1/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      placeholder="name@company.com"
                      required
                    />
                    <button
                      onClick={handleChangeRole}
                      className="bg-blue-700 text-white ml-2 p-3 text-sm rounded text-center"
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
        {!customers && (
          <div className="bg-gray-100 font-sans leading-normal tracking-normal">
            <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
              ĐĂNG KÝ ĐỐI TÁC VÀ KHAI THÁC DỊCH VỤ
            </h1>
            <div className="container mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Các dịch vụ bạn có thể đăng ký
              </h2>
              <ul className="ml-2">
                <li className="text-gray-700 mb-8 text-xl">
                  Đăng ký dịch vụ cho thuê khách sạn
                </li>
                <li className="text-gray-700 mb-8 text-xl">
                  Đăng ký nhanh , nhận ưu đãi ngập tràn
                </li>
              </ul>
              <Button
                to={'/register'}
                className="bg-blue-700 text-white p-3 text-xl rounded text-center"
              >
                Đăng ký ngay
              </Button>
            </div>
          </div>
        )}
        {customers?.isRole === 1 && (
          <div className="font-sans leading-normal tracking-normal">
            <div className="flex justify-around">
              <Button
                to={'/partner/myhotel'}
                className="bg-blue-700 text-white p-3 text-lg rounded text-center hover:bg-opacity-90"
              >
                Dịch vụ khách sạn của tôi
              </Button>
            </div>
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Partner;
