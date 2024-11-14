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
    const response = await dispatch(
      RegisterPartner({ customersEmail: email, customers })
    );
    if (response.payload.status === true) {
      toast.success('Đăng ký đối tác thành công');
    } else {
      toast.warning('Đăng ký đối tác không thành công');
    }
  };

  const renderServiceSection = (isRegistered) => (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <h1 className="text-2xl font-bold text-gray-900 mb-4 text-center">
        ĐĂNG KÝ ĐỐI TÁC VÀ KHAI THÁC DỊCH VỤ
      </h1>
      <div className="flex justify-center my-8 p-4 bg-white rounded-lg shadow-md">
        <div className="flex-1">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Các dịch vụ bạn có thể đăng ký
          </h2>
          <ul className="ml-2">
            <li className="text-gray-700 mb-8 text-sm">
              Đăng ký dịch vụ cho thuê khách sạn
            </li>
            {isRegistered && (
              <li className="text-gray-700 mb-8 text-sm">
                Đăng ký dịch vụ cho đặt chuyến đi
              </li>
            )}
            {!isRegistered && (
              <li className="text-gray-700 mb-8 text-sm">
                Đăng ký nhanh , nhận ưu đãi ngập tràn
              </li>
            )}
          </ul>
          <Button
            to={isRegistered ? '/partner/myhotel/addhotels' : '/sign-in'}
            className="bg-blue-700 text-white p-3 text-sm rounded text-center"
            onClick={isRegistered && toggleForm}
          >
            Đăng ký ngay
          </Button>
        </div>
        {isOpen && (
          <div className="flex-1">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              <strong className="text-red-800 mr-1">*</strong>Địa chỉ email của
              bạn
            </label>
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white ml-1">
              Nhập email của bạn để xác nhận đăng ký dịch vụ khách sạn
            </label>
            <div className="flex items-center">
              <input
                type="email"
                value={
                  customers?.customer_email ? customers?.customer_email : ''
                }
                onChange={handleEmailChange}
                className="bg-gray-50 border w-1/3 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              <Button
                onClick={handleChangeRole}
                className="bg-blue-700 text-white ml-2 p-3 text-sm rounded text-center"
              >
                Xác nhận
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const renderChildren = () => {
    if (customers?.isRole === 3) {
      return <Outlet />;
    } else if (customers?.isRole === 1) {
    }
    return null;
  };

  return (
    <>
      <div className="p-4">
        {customers?.isRole === 1 && renderServiceSection(true)}
        {!customers && renderServiceSection(true)}
        {renderChildren()}
      </div>
    </>
  );
}

export default Partner;
