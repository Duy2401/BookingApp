import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Resorts from '../../../../assets/images/Resorts.jpg';
import Hotels from '../../../../assets/images/Hotels.jpg';
import CanHo from '../../../../assets/images/CanHo.jpg';
import BietThu from '../../../../assets/images/BietThu.jpg';
import Khinghiduong from '../../../../assets/images/khunghiduong.jpg';
import { useDispatch, useSelector } from 'react-redux';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GetTopRatedHotels } from '../../../../redux/hotelsSlice';

const LocalTrend = () => {
  const dispatch = useDispatch();
  const { hotels, loading, error } = useSelector((state) => state.hotels);
  const [listHotel, setListHotel] = useState([]);
  useEffect(() => {
    dispatch(GetTopRatedHotels());
    setListHotel(hotels);
  }, [dispatch]);
  console.log(listHotel);
  return (
    <div className="font-Nunito mt-10">
      <div>
        <h1 className="text-2xl font-black my-1 mb-3 ">
          Bạn có còn quan tâm đến những chỗ nghỉ này ?
        </h1>
      </div>
      <Swiper
        spaceBetween={10}
        slidesPerView={2}
        breakpoints={{
          1024: {
            slidesPerView: 2,
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
        {listHotel?.map((hotel, index) => (
          <SwiperSlide>
            <a href={`/stays/${hotel._id}`} key={index}>
              <div className=" hover:cursor-pointer mb-2.5 card min-w-max rounded overflow-hidden flex flex-col items-center shadow-lg h-full">
                <img
                  src={
                    hotel.hotel_description.description_images[0]?.name_image
                  }
                  alt="thumbnail"
                  className="image w-full h-48 object-cover rounded-t"
                />
                <div className="content p-4 w-full">
                  <h1 className="text-base font-extrabold mb-1">
                    {hotel.hotel_name}
                  </h1>
                  <p className="text-sm text-textGrey mb-1 text-wrap ">
                    {hotel.hotel_address}
                  </p>
                  <div className="flex items-center">
                    <div className="bg-blue-700 text-white p-1 rounded">
                      {hotel.averageRating}
                    </div>
                    <div className="flex-1 ml-1 text-sm ">
                      <span className="align-middle">Tuyệt vời</span>
                      <span className="align-middle">
                        {' '}
                        · {hotel.totalComments} đánh giá
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default LocalTrend;
