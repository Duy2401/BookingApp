import React from "react";
import Button from "../../components/Button/button";
import { ReactComponent as Payment } from "../../assets/icons/Payment.svg";
import SvgIcon from "../../components/SvgIcon/SvgIcon";
const BookingSummary = ({ bookingDetails }) => {
  console.log(bookingDetails);
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(value);
  };
  const checkInDate = new Date(bookingDetails.checkInDate);
  const checkOutDate = new Date(bookingDetails.checkOutDate);
  const differenceInMilliseconds = checkOutDate - checkInDate;
  const differenceInDays = Math.ceil(
    differenceInMilliseconds / (1000 * 60 * 60 * 24)
  );
  return (
    <div>
      <div className="bg-white p-2 rounded-lg border-2">
        <div className="list-item2 my-4 cursor-pointer">
          <div className="p-2  items-center justify-center rounded-md">
            {bookingDetails.hotel.map((value, index) => (
              <div className="flex flex-col col-span-6 md:col-span-8 h-full gap-2">
                <div className="flex items-center w-full">
                  <div className="flex gap-0 text-xl font-extrabold  hover:text-black cursor-pointer">
                    {value.hotel_name}
                  </div>
                </div>
                <div className="flex flex-col ">
                  <div className="flex">
                    <p className="text-xs text-textGrey float-right mb-1">
                      {value.hotel_address}
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
                <div className="rating flex items-center">
                  <Button className="bg-backgroud text-white rounded-bl-none rounded-md">
                    9,1
                  </Button>
                  <div className="ml-2 text-xs">736 đánh giá</div>
                </div>
              </div>
            ))}
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
                  <p>{bookingDetails.checkInDate}</p>
                  <span></span>
                </div>
                <div className="border-l-2 p-1 pl-2 font-bold">
                  <h4>Trả phòng</h4>
                  <p>{bookingDetails.checkOutDate}</p>
                </div>
              </div>
              <div className="border-b-2 pb-2">
                <p className="text-base font-medium">Tổng thời gian lưu trú</p>
                <p className="font-bold">{differenceInDays} đêm</p>
              </div>
              <div className="">
                <p className="text-base font-medium">Bạn đã chọn</p>
                {bookingDetails.rooms.map((room) => (
                  <p className="font-bold mb-4">
                    {room.quantity} {room.roomName}
                  </p>
                ))}
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
