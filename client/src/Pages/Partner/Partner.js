import { useState } from "react";
import { Outlet } from "react-router-dom";
import Button from "../../components/Button/button";
import { useSelector } from "react-redux";
import ManagerHotels from "./manager/managerHotel";
function Partner() {
  const customers = useSelector((state) => state.customers?.customers);
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
        {customers?.isRole === 1 && (
          <div className="font-sans leading-normal tracking-normal">
            <div className="flex justify-between">
              <Button className="bg-blue-700 text-white p-3 text-xl rounded text-center">
                Dịch vụ khách sạn của tôi
              </Button>
              <Button className="bg-blue-700 text-white p-3 text-xl rounded text-center">
                Dịch vụ vé máy bay của tôi{" "}
              </Button>
              <Button className="bg-blue-700 text-white p-3 text-xl rounded text-center">
                Dịch vụ chuyến đi tham quan của tôi
              </Button>
            </div>
            <ManagerHotels />
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}

export default Partner;
