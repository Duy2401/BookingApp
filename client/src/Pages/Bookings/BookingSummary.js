import React from "react";
import Button from "../../components/Button/button";
import { ReactComponent as Payment } from "../../assets/icons/Payment.svg";
import SvgIcon from "../../components/SvgIcon/SvgIcon";
const BookingSummary = ({ hotelDetails, bookingDetails }) => {
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(value);
  };
  return (
    <div>
      <div className="bg-white p-2 rounded-lg border-2">
        <div className="list-item2 my-4 cursor-pointer">
          <div className="p-2  items-center justify-center rounded-md">
            <div className="flex flex-col col-span-6 md:col-span-8 h-full gap-2">
              <div className="flex items-center w-full">
                <div className="flex gap-0 text-xl font-extrabold  hover:text-black cursor-pointer">
                  The Land Hotel & Apartment
                </div>
              </div>

              <div className="flex flex-col ">
                <div className="flex">
                  <p className="text-xs text-textGrey float-right mb-3">
                    28 Đường Thi Sách, Vũng Tàu, Việt Nam
                  </p>
                </div>
              </div>
              <div className="flex flex-col ">
                <div className="flex justify-between">
                  <Button className="bg-green-700 p-1 text-white rounded-md text-xs">
                    Ưu đãi mùa du lịch
                  </Button>
                </div>
              </div>
              <div className="flex justify-between flex-row mt-3 ">
                <div className="">
                  <p className="text-sm font-extrabold ml-1">
                    Phòng Deluxe Giường Đôi
                  </p>
                  <p className="text-xs ml-1">1 giường đôi cực lớn</p>
                </div>
                <div className="">
                  <div className="text-xs text-textGrey float-right mb-3">
                    3 đêm, 1 người lớn
                  </div>
                  {/* <div className="text-xl font-bold mb-3">VND 1.620.810</div>
                    <div className="text-xs text-textGrey float-right mb-3">
                      Đã bao gồm thuế và phí
                    </div> */}
                </div>
              </div>
              <div className="rating flex items-center">
                <Button className="bg-backgroud text-white rounded-bl-none rounded-md">
                  9,1
                </Button>
                <div className="ml-2 text-xs">736 đánh giá</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg border-2 mt-4">
        <div className="list-item2 my-4 cursor-pointer">
          <div className="p-2 items-center justify-center rounded-md">
            <div className="flex flex-col col-span-6 md:col-span-8 h-full gap-2">
              <div className="flex items-center w-full">
                <div className="flex gap-0 text-xl font-extrabold  hover:text-black cursor-pointer">
                  Chi tiết đặt phòng của bạn
                </div>
              </div>
              <div className="mt-3 grid grid-cols-2 ">
                <div className="p-1 pr-2 text-wrap font-bold">
                  <h4>Nhận phòng</h4>
                  <p>{bookingDetails.checkIn}</p>
                  <span></span>
                </div>
                <div className="border-l-2 p-1 pl-2 font-bold">
                  <h4>Trả phòng</h4>
                  <p>{bookingDetails.checkOut}</p>
                </div>
              </div>
              <div className="border-b-2 pb-2">
                <p className="text-base font-medium">Tổng thời gian lưu trú</p>
                <p className="font-bold">{bookingDetails.duration} đêm</p>
              </div>
              <div className="">
                <p className="text-base font-medium">Bạn đã chọn</p>
                <p className="font-bold mb-4">{bookingDetails.room}</p>
                <Button href="/" className="text-blue-700 mt-2">
                  Đổi lựa chọn của bạn
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-2 rounded-lg border-2 mt-4">
        <div className="list-item2 my-4 cursor-pointer">
          <div className="p-2 items-center justify-center rounded-md">
            <div className="flex flex-col col-span-6 md:col-span-8 h-full gap-2">
              <div className="flex items-center w-full">
                <div className="flex gap-0 text-xl font-extrabold  hover:text-black cursor-pointer">
                  Tóm tắt giá
                </div>
              </div>
              <div className="border-b-2 pb-2">
                <div className="flex justify-between">
                  <p className="text-base font-medium">Giá tiền</p>
                  <p className="text-base font-normal">
                    VND {formatCurrency(bookingDetails.totalPrice)}
                  </p>
                </div>
              </div>
              <div className="border-b-2 pb-2">
                <div className="flex justify-between">
                  <p className="text-sm">
                    Bạn được giảm giá vì chỗ nghỉ này đang có ưu đãi trong thời
                    gian có hạn cho một số phòng khớp với tìm kiếm của bạn.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className=" flex p-4 justify-between items-center mt-6 bg-bgTotal rounded">
          <div className="">
            <p className="text-2xl font-bold">Tổng tiền</p>
          </div>
          <div>
            <p className="text-2xl font-bold">
              VND {formatCurrency(bookingDetails.totalPrice)}
            </p>
            <p className="text-sm ">Đã bao gồm thuế và phí</p>
          </div>
        </div>
        <div className="flex p-4 justify-between items-center mt-6 bg-bgTotal">
          <div className="flex flex-col col-span-6 md:col-span-8 h-full gap-2">
            <div className="flex items-center w-full">
              <div className="flex gap-0 text-xl font-extrabold  hover:text-black cursor-pointer">
                Thông tin giá
              </div>
            </div>
            <div className="pb-2">
              <div className="flex justify-between">
                <SvgIcon icon={Payment} width={20} height={20} />
                <p className="text-sm font-medium pl-2">
                  Bao gồm VND 40.700 phí và thuế
                </p>
              </div>
              <p className="text-xs mt-2 pl-7">8 % Thuế GTGT VND 40.700</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BookingSummary;
