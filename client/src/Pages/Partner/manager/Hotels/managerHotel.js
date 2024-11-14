import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GetAllHotelOfPartner } from '../../../../redux/hotelsSlice';
import Button from '../../../../components/Button/button';

const ManagerHotels = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [listHotel, setListHotel] = useState([]);
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow((show) => !show);
  };
  useEffect(() => {
    const getListHotels = async () => {
      const response = await dispatch(GetAllHotelOfPartner({ customers }));
      setListHotel(response.payload?.data);
    };
    getListHotels();
  }, [dispatch, customers]);

  return (
    <div className="p-4">
      <div className="header flex justify-between items-center bg-gray-50 my-3 rounded-lg">
        <h1 className="text-xl text-gray-700 uppercase font-bold">
          KHÁCH SẠN CỦA TÔI
        </h1>
        <Button
          to={'/partner/addhotels'}
          className="bg-blue-700 text-white p-5 rounded flex items-center hover:bg-opacity-90"
          onClick={handleShow}
          leftIcon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M464 128H272l-64-64H48a48 48 0 0 0-48 48v288a48 48 0 0 0 48 48h416a48 48 0 0 0 48-48V176a48 48 0 0 0-48-48M359.5 296a16 16 0 0 1-16 16h-64v64a16 16 0 0 1-16 16h-16a16 16 0 0 1-16-16v-64h-64a16 16 0 0 1-16-16v-16a16 16 0 0 1 16-16h64v-64a16 16 0 0 1 16-16h16a16 16 0 0 1 16 16v64h64a16 16 0 0 1 16 16Z"
              />
            </svg>
          }
        >
          THÊM KHÁCH SẠN
        </Button>
      </div>
      {listHotel?.length > 0 ? (
        <div className="border-2 p-5 rounded">
          <div className="grid grid-cols-2 gap-4">
            {listHotel?.map((hotel, index) => (
              <a
                key={index}
                href={`/partner/myhotel/${hotel._id}`}
                className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <img
                  className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                  src={hotel.hotel_description.description_images[0].name_image}
                  alt={hotel.hotel_name}
                />
                <div className="flex flex-col justify-between p-4 leading-normal">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {hotel.hotel_name}
                  </h5>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    {hotel.hotel_address}
                  </p>
                  <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                    <strong> Loại hình:</strong> {hotel.hotel_type}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      ) : (
        <h1 className="text-xl text-gray-700 uppercase font-bold text-center mb-24">
          Chưa đăng ký khách sạn nào
        </h1>
      )}
    </div>
  );
};
export default ManagerHotels;
