import Button from "../../../../components/Button/button";
import SvgIcon from "../../../../components/SvgIcon/SvgIcon";
import { ReactComponent as Like } from "../../../../assets/icons/Like.svg";
import { ReactComponent as Location } from "../../../../assets/icons/location.svg";
import { ReactComponent as Bed } from "../../../../assets/icons/Bed.svg";
import Review from "../reviews/review";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getDetailsHotel } from "../../../../redux/hotelsSlice";
import { setBookingDetails } from "../../../../redux/bookingsSlice";
import { toast } from "react-toastify";
const HotelDetails = () => {
  const { aid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const customer = useSelector((state) => state.customers?.customers);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [bookingRooms, setBookingRooms] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getDetailsHotel({ idHotel: aid }));
      setHotelDetails([result.payload.data]);
    };
    fetchData();
  }, [dispatch]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };
  const handleAddRoom = (roomId, roomType, availableRooms, price) => {
    // Lấy số lượng phòng từ input
    const quantity = parseInt(
      document.querySelector(`#quantity-${roomId}`)?.value || 0,
      10
    );

    // Kiểm tra số lượng phòng có hợp lệ không
    if (quantity < 0) {
      alert("Quantity cannot be negative.");
      return;
    }

    if (quantity > availableRooms) {
      alert("Quantity cannot be more than available rooms.");
      return;
    }

    // Cập nhật hoặc thêm phòng mới vào danh sách
    setBookingRooms((prevRooms) => {
      const existingRoomIndex = prevRooms.findIndex(
        (room) => room.roomId === roomId
      );

      if (existingRoomIndex > -1) {
        const updatedRooms = [...prevRooms];
        const currentQuantity = updatedRooms[existingRoomIndex].quantity;

        if (quantity === 0) {
          // Xóa phòng khỏi danh sách nếu số lượng bằng 0
          updatedRooms.splice(existingRoomIndex, 1);
        } else {
          // Cập nhật số lượng phòng
          updatedRooms[existingRoomIndex].quantity = quantity;
        }

        return updatedRooms;
      } else {
        if (quantity > 0) {
          // Thêm phòng mới vào danh sách nếu chưa có
          const newRoom = {
            roomId,
            roomType,
            price,
            quantity,
          };
          return [...prevRooms, newRoom];
        } else {
          return prevRooms;
        }
      }
    });
  };

  const handleBookRooms = () => {
    if (bookingRooms.length === 0) {
      alert("No rooms selected.");
      return;
    }
    const prices = bookingRooms.reduce(
      (total, room) => total + room.price * room.quantity,
      0
    );
    const bookingData = {
      hotelID: hotelDetails,
      customer: customer?._id,
      rooms: bookingRooms,
      checkInDate: localStorage.getItem("checkin"),
      checkOutDate: localStorage.getItem("checkout"),
      totalPrice: prices + prices * 0.1,
      booking_type: "hotel",
    };

    dispatch(setBookingDetails(bookingData));
    console.log(bookingData);
    if (bookingData.checkInDate === "" || bookingData.checkOutDate === "") {
      toast.warning("Vui lòng điền thời gian");
    } else {
      navigate("/booking");
    }
  };
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
              <h2 className="text-2xl font-bold mb-4">Loại chỗ ở</h2>
              <div className="space-y-4">
                {hotel.room_types?.map((room, index) => (
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
                    <p>Giá phòng: {formatCurrency(room.price)}</p>
                    <div className="flex items-center space-x-2 mb-4">
                      {room.totalRooms > 0 ? (
                        <div className="flex items-center my-3">
                          <input
                            id={`quantity-${room._id}`}
                            type="number"
                            min={0}
                            max={room.totalRooms}
                            className="border border-gray-300 rounded-lg px-3 py-1 w-36"
                            placeholder="Số phòng"
                          />
                          <p className="font-bold text-red-600 ml-2">
                            Còn lại {room.totalRooms <= 5 && room.totalRooms}{" "}
                            phòng
                          </p>
                        </div>
                      ) : (
                        <p className="font-bold text-red-600">Đã hết phòng</p>
                      )}
                    </div>
                    {room.totalRooms > 0 && (
                      <Button
                        onClick={() =>
                          handleAddRoom(
                            room._id,
                            room.room_type,
                            room.totalRooms,
                            room.price
                          )
                        }
                        className="bg-blue-500 text-white px-4 py-1 rounded-lg active:opacity-60"
                      >
                        Đặt phòng
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              <Button
                onClick={handleBookRooms}
                className="bg-blue-500 text-white px-4 py-1 rounded-lg mt-4 active:opacity-60"
              >
                Đặt phòng
              </Button>
            </div>
          </div>
          <Review />
          <div className="my-6 mx-auto" id="rules">
            <div className="bg-white border-2 p-4 shadow-md rounded-lg">
              <h2 className="text-2xl font-bold mb-4">Quy tắc chung</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.hotel_description.description_generalRules.map(
                  (rule, index) => (
                    <div
                      className="bg-gray-100 p-4 rounded-lg shadow-sm"
                      key={index}
                    >
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
