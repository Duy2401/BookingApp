import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import provinces from '../../../../locales/provinces.json';
import { SearchHotels } from '../../../../redux/hotelsSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const ExploreVietnam = () => {
  const [desti, setDesti] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = async (searchTerm) => {
    localStorage.setItem('searchTerm', searchTerm);

    const data = await dispatch(SearchHotels({ keySearch: searchTerm }));
    setTimeout(() => {
      if (data.payload.status === true) {
        navigate(
          searchTerm &&
            `/stays/searchresults?ss=${encodeURIComponent(searchTerm)}&checkin=
            )}&checkout=&group_adults=&no_rooms=&group_children=`
        );
      } else {
        toast.error(data.payload.message);
      }
    }, 1000);
    if (searchTerm === '') return toast.warning('Nhập địa điểm bạn muốn đến ');
  };
  useEffect(() => {
    // Assuming `provinces` is an array you want to filter
    const filteredResults = provinces.filter((item, index) => item.image); // Filter first 20 items

    setDesti(filteredResults);
  }, []);
  return (
    <div className="font-Nunito mt-10">
      <div>
        <h1 className="text-2xl font-black my-1 mb-5">
          Khám phá các địa điểm ở Việt Nam ?
        </h1>
      </div>
      <Swiper spaceBetween={20} slidesPerView={6} className="pb-4">
        {desti.map((value, index) => (
          <SwiperSlide key={index} onClick={() => handleSearch(value.name)}>
            <div className="mb-2.5 card max-w-40 max-h-52 rounded overflow-hidden justify-center flex flex-col items-center hover:cursor-pointer">
              <img
                src={value.image}
                alt="thumbnail"
                className="image w-full h-48 object-cover rounded"
              />
              <div className="content p-4 w-full">
                <h1 className="text-base text-center font-extrabold mb-1 text-nowrap">
                  {value.name}
                </h1>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default ExploreVietnam;
