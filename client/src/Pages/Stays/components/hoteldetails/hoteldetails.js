import Button from "../../../../components/Button/button";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import { ReactComponent as Like } from "../../../../assets/icons/Like.svg";
import { ReactComponent as Location } from "../../../../assets/icons/location.svg";
import { ReactComponent as Bed } from "../../../../assets/icons/Bed.svg";
import Review from "../reviews/review";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDetailsHotel } from "../../../../redux/hotelsSlice";
import { setBookingDetails } from "../../../../redux/bookingsSlice";

const HotelDetails = () => {
  const id = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [hotelDetails, setHotelDetails] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getDetailsHotel({ idHotel: id.aid }));
      setHotelDetails([result.payload.data]);
    };
    fetchData();
  }, [dispatch, id.aid]);
  const handleBookRoom = (roomType, roomName, availableRooms, price_range) => {
    const quantity = parseInt(
      document.querySelector(`#quantity-${roomType}`)?.value || 0,
      10
    );

    if (quantity > 0 && quantity <= availableRooms) {
      const bookingData = {
        hotel: hotelDetails,
        rooms: [{ roomType, roomName, price: price_range, quantity }],
        checkInDate: localStorage.getItem("checkin"),
        checkOutDate: localStorage.getItem("checkout"),
        totalPrice: quantity * price_range,
      };

      dispatch(setBookingDetails(bookingData));
      navigate("/booking");
    } else {
      alert("Invalid quantity selected.");
    }
  };

  if (!hotelDetails) return <div>Loading...</div>;
  return (
    <div className="relative">
      {hotelDetails?.map((hotel, index) => (
        <div className="px-9 p-2 mt-30 mx-44 font-Nunito" key={index}>
          <div className="flex justify-between border-b-2">
            <a href="#summary">
              <Button className="p-5 hover:bg-gray-100">Tổng quan</Button>
            </a>
            <a href="#rooms">
              <Button className="p-5 hover:bg-gray-100">
                Thông tin căn hộ & giá
              </Button>
            </a>
            <a href="#convenient">
              <Button className="p-5 hover:bg-gray-100">Tiện nghi</Button>
            </a>
            <a href="#rules">
              <Button className="p-5 hover:bg-gray-100">Quy tắc chung</Button>
            </a>
            <a href="#note">
              <Button className="p-5 hover:bg-gray-100">Ghi chú</Button>
            </a>
          </div>
          <div className="" id="summary">
            <div className="flex justify-between items-center cursor-pointer">
              <h1 className="text-2xl font-bold my-1">{hotel.hotel_name}</h1>
              <SvgIcon icon={Like} width={24} height={24} />
            </div>
            <div className="flex  items-center">
              <SvgIcon icon={Location} width={28} height={28} />
              <p>{hotel.hotel_address}</p>
            </div>
            <div className="mt-4 grid grid-cols-grid_col_2C">
              <div className="">
                <div className="grid gap-4">
                  <div>
                    <img
                      className="h-auto max-w-full rounded-lg"
                      src={
                        hotel?.hotel_description?.description_images?.[0]
                          ? hotel?.hotel_description?.description_images?.[0]
                              .name_image
                          : ""
                      }
                      alt=""
                    />
                  </div>
                  <div className="grid grid-cols-5 gap-4">
                    {hotel?.hotel_description?.description_images
                      ? hotel?.hotel_description?.description_images
                          .slice(1)
                          .map((item, index) => (
                            <div key={index}>
                              <img
                                className="h-auto max-w-full rounded-lg"
                                src={item.name_image}
                                alt=""
                              />
                            </div>
                          ))
                      : ""}
                  </div>
                </div>
              </div>
              <div className="map-container ml-2">
                <div className="flex items-center p-3 w-full">
                  <div className="flex-1">
                    <h4 className="font-bold">Xuất sắc</h4>
                    <div className="mr-2 text-xs">736 đánh giá</div>
                  </div>
                  <div>
                    <Button className="bg-backgroud p-1 text-white rounded-bl-none rounded-md">
                      9,1
                    </Button>
                  </div>
                </div>
                <div className="map relative">
                  <div className="w-full h-60 ">
                    <iframe
                      className="w-full h-full rounded"
                      src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1721538591064!5m2!1svi!2s"
                      width="600"
                      height="450"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                  <button className="show-map text-white bg-btnSearch text-sm font-bold rounded p-2 absolute top-1/2 translate-x-1/3">
                    Hiển thị trên bản đồ
                  </button>
                </div>
              </div>
            </div>
            <div className="grid gap-4">
              <div className="my-3 py-3">
                <div className="grid grid-cols-5 gap-4">
                  {hotel?.hotel_description?.description_amenities[0]
                    .split(",")
                    .map((item, index) => (
                      <Button
                        className="border-2 rounded min-w-28 p-3"
                        key={index}
                      >
                        {item}
                      </Button>
                    ))}
                </div>
              </div>
            </div>
            <div className="text-sm w-2/3 text-justify leading-8">
              {hotel.hotel_descriptive}
            </div>
          </div>
          <div className="grid gap-4" id="convenient">
            <div className="my-3 py-3">
              <h1 className="mb-3 text-lg font-bold">
                Các tiện nghi được ưa chuộng nhất
              </h1>
              <div className="grid grid-cols-5 gap-4">
                {hotel?.hotel_description?.description_amenities[0]
                  .split(",")
                  .map((item, index) => (
                    <Button
                      className="min-w-28 p-2 border-2 rounded text-left"
                      key={index}
                    >
                      {item}
                    </Button>
                  ))}
              </div>
            </div>
          </div>
          <div className="container mx-auto py-6" id="rooms">
            <div className="mt-6" id="rooms">
              <h2 class="text-2xl font-bold mb-4">Loại chỗ ở</h2>
              <div className="space-y-4">
                {hotel.RoomType?.room_types?.map((room, index) => (
                  <div
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    key={index}
                  >
                    <div className="flex items-center mb-2">
                      <p className="font-bold text-blue-700 underline mr-3">
                        {room.room_type}
                      </p>
                      <SvgIcon icon={Bed} width={20} height={20} />
                    </div>
                    <p>Giá phòng: {room.price_range}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      {room.isAvailable ? (
                        <>
                          <input
                            id={`quantity-${room._id}`}
                            type="number"
                            min={0}
                            max={room.availableRooms}
                            className="border border-gray-300 rounded-lg px-3 py-1 w-28"
                            placeholder="Số phòng"
                          />
                          <Button
                            onClick={() =>
                              handleBookRoom(
                                room._id,
                                room.room_type,
                                room.availableRooms,
                                room.price_range
                              )
                            }
                            className="bg-blue-500 text-white px-4 py-1 rounded-lg"
                          >
                            Đặt phòng
                          </Button>
                        </>
                      ) : (
                        <p className="font-bold text-red-600">Đã hết phòng</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Review />
          <div className="my-6 mx-auto" id="rules">
            <div className="bg-white border-2 p-4 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Quy tắc chung</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.hotel_description.description_generalRules.map(
                  (rule, index) => (
                    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
                      <h3 className="text-lg font-bold mb-2">
                        {rule.rules_title}
                      </h3>
                      <ul className="list-none pl-2">
                        <li>{rule.rules_content}</li>
                      </ul>
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
          <div className="container mx-auto" id="note">
            <div className="bg-white p-4 shadow-md border-2 rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Ghi chú</h2>
              <div className="flex flex-wrap my-4">
                {hotel.hotel_description.description_note.map((note, index) => (
                  <div className="w-full md:w-1/2 px-4 mb-4" key={index}>
                    <p className="pl-2">{note.note_content}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
export default HotelDetails;
