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

const LocalTrend = () => {
  return (
    <div className="font-Nunito mt-10">
      <div>
        <h1 className="text-2xl font-black my-1 mb-3">
          Bạn có còn quan tâm đến những chỗ nghỉ này ?
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
        className="pb-4"
      >
        <SwiperSlide>
          <div className="mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg">
            <img
              src={Hotels}
              alt="thumbnail"
              className="image w-full h-48 object-cover rounded-t"
            />
            <div className="content p-4 w-full">
              <h1 className="text-base font-extrabold mb-1">
                TTR Studio Apart Hotel
              </h1>
              <p className="text-sm text-textGrey mb-1">
                Thành phố Đà Lạt, Việt Nam
              </p>
              <div className="flex items-center">
                <div className="bg-blue-700 text-white p-1 rounded">8.7</div>
                <div className="flex-1 ml-1 text-sm ">
                  <span className="align-middle">Tuyệt vời</span>
                  <span className="align-middle"> · 401 đánh giá</span>
                </div>
              </div>
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
            <div className="content p-4 w-full">
              <h1 className="text-base font-extrabold mb-1">
                TTR Studio Apart Hotel
              </h1>
              <p className="text-sm text-textGrey mb-1">
                Thành phố Đà Lạt, Việt Nam
              </p>
              <div className="flex items-center">
                <div className="bg-blue-700 text-white p-1 rounded">8.7</div>
                <div className="flex-1 ml-1 text-sm ">
                  <span className="align-middle">Tuyệt vời</span>
                  <span className="align-middle"> · 401 đánh giá</span>
                </div>
              </div>
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
            <div className="content p-4 w-full">
              <h1 className="text-base font-extrabold mb-1">
                TTR Studio Apart Hotel
              </h1>
              <p className="text-sm text-textGrey mb-1">
                Thành phố Đà Lạt, Việt Nam
              </p>
              <div className="flex items-center">
                <div className="bg-blue-700 text-white p-1 rounded">8.7</div>
                <div className="flex-1 ml-1 text-sm ">
                  <span className="align-middle">Tuyệt vời</span>
                  <span className="align-middle"> · 401 đánh giá</span>
                </div>
              </div>
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
            <div className="content p-4 w-full">
              <h1 className="text-base font-extrabold mb-1">
                TTR Studio Apart Hotel
              </h1>
              <p className="text-sm text-textGrey mb-1">
                Thành phố Đà Lạt, Việt Nam
              </p>
              <div className="flex items-center">
                <div className="bg-blue-700 text-white p-1 rounded">8.7</div>
                <div className="flex-1 ml-1 text-sm ">
                  <span className="align-middle">Tuyệt vời</span>
                  <span className="align-middle"> · 401 đánh giá</span>
                </div>
              </div>
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
            <div className="content p-4 w-full">
              <h1 className="text-base font-extrabold mb-1">
                TTR Studio Apart Hotel
              </h1>
              <p className="text-sm text-textGrey mb-1">
                Thành phố Đà Lạt, Việt Nam
              </p>
              <div className="flex items-center">
                <div className="bg-blue-700 text-white p-1 rounded">8.7</div>
                <div className="flex-1 ml-1 text-sm ">
                  <span className="align-middle">Tuyệt vời</span>
                  <span className="align-middle"> · 401 đánh giá</span>
                </div>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
export default LocalTrend;
