import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import Resorts from "../../../../assets/images/Resorts.jpg";
import Hotels from "../../../../assets/images/Hotels.jpg";
import CanHo from "../../../../assets/images/CanHo.jpg";
import BietThu from "../../../../assets/images/BietThu.jpg";
import Khinghiduong from "../../../../assets/images/khunghiduong.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Import các modules cần thiết của Swiper
const StayType = () => {
  return (
    <div className="font-Nunito mt-10">
      <div>
        <h1 className="text-2xl font-black my-1 mb-3">
          Tìm theo loại chỗ nghĩ
        </h1>
      </div>
      <Swiper
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          1024: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 2,
          },
          640: {
            slidesPerView: 1,
          },
        }}
        className={"pb-4"}
      >
        <SwiperSlide>
          <div className="mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg">
            <img
              src={Hotels}
              alt="thumbnail"
              className="image w-full h-48 object-cover rounded-t"
            />
            <div className="content p-4">
              <span className="font-bold text-lg">Khách sạn</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg">
            <img
              src={CanHo}
              alt="thumbnail"
              className="image w-full h-48 object-cover rounded-t"
            />
            <div className="content p-4">
              <span className="font-bold text-lg">Căn hộ</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg">
            <img
              src={Resorts}
              alt="thumbnail"
              className="image w-full h-48 object-cover rounded-t"
            />
            <div className="content p-4">
              <span className="font-bold text-lg">Resorts</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg">
            <img
              src={BietThu}
              alt="thumbnail"
              className="image w-full h-48 object-cover rounded-t"
            />
            <div className="content p-4">
              <span className="font-bold text-lg">Các Biệt Thự</span>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg">
            <img
              src={Khinghiduong}
              alt="thumbnail"
              className="image w-full h-48 object-cover rounded-t"
            />
            <div className="content p-4">
              <span className="font-bold text-lg">Các khu nghỉ dưỡng</span>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default StayType;
