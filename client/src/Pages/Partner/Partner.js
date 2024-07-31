import { useState } from "react";
import { Outlet } from "react-router-dom";
import Button from "../../components/Button/button";
import { useSelector } from "react-redux";
function Partner() {
  const customers = useSelector((state) => state.customers?.customers);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
  };
  return (
    <>
      <div className="p-4">
        {customers?.isRole === 2 && (
          <div className="p-4 m-4 text-center">
            <Button
              to={"/partner/addhotels"}
              className="bg-blue-700 text-white p-5 rounded"
              onClick={handleShow}
            >
              TẠO KHÁCH SẠN
            </Button>
          </div>
        )}
        {customers?.isRole === 1 && (
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
                  Đăng ký dịch vụ cho đặt vé máy bay
                </li>
                <li className="text-gray-700 mb-8 text-xl">
                  Đăng ký dịch vụ cho đặt chuyến đi
                </li>
              </ul>
              <Button className="bg-blue-700 text-white p-3 text-xl rounded text-center">
                Đăng ký ngay
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
