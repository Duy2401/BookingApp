import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getDetailsHotel } from "../../../../redux/hotelsSlice";
import Button from "../../../../components/Button/button";
import { getBooking } from "../../../../redux/bookingsSlice";

const MyHotel = () => {
  const id = useParams();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [hotelDetails, setHotelDetails] = useState(null);
  const [booking, setBooking] = useState([]);

  const [expandedProductId, setExpandedProductId] = useState(null);
  const toggleProductDetails = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };
  useEffect(() => {
    const fetchData = async () => {
      const result = await dispatch(getDetailsHotel({ idHotel: id.id }));
      setHotelDetails([result.payload.data]);
    };
    const getBill = async () => {
      const result = await dispatch(getBooking(customers));
      setBooking(result.payload?.data);
    };
    getBill();
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
  console.log(booking);

  return (
    <div className="relative">
      {hotelDetails?.map((hotel, index) => (
        <div className="px-9 p-2 mt-30 mx-44 font-Nunito" key={index}>
          <div className="" id="summary">
            <div className="mt-4">
              <div className="">
                <div className="grid gap-4">
                  <h1 className="text-2xl font-bold mb-2">Hình ảnh mô tả</h1>
                  <div className="flex gap-2 justify-around">
                    {hotel.hotel_description.description_images.map(
                      (file, index) => (
                        <div key={index} className="mb-2">
                          <img
                            src={file.name_image}
                            alt={`Preview ${index}`}
                            className="w-56 h-32 object-cover rounded"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid gap-4 mt-4">
              <h1 className="text-2xl font-bold">Tiện ích</h1>
              <div className="py-1">
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
          </div>
          <div className="container mx-auto py-6" id="rooms">
            <div className="mt-6" id="rooms">
              <h2 className="text-2xl font-bold mb-4">Các loại phòng</h2>
              <div className="space-y-4">
                {hotel.room_types?.map((room, index) => (
                  <div
                    className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    key={index}
                  >
                    <div>
                      <div className="flex items-center mb-2">
                        <p className="font-bold text-blue-700 underline mr-3">
                          {room.room_type}
                        </p>
                      </div>
                      <p>Giá phòng: {formatCurrency(room.price)}</p>
                    </div>
                    <div className="flex justify-evenly mt-2">
                      <button className="bg-blue-100  text-blue-800 text-base font-medium me-2 p-4 rounded dark:bg-blue-900 dark:text-blue-300">
                        <p>Số lượng phòng</p>
                        {room.totalRooms ? (
                          <p>{room.totalRooms} / phòng</p>
                        ) : (
                          <p className="text-red-700">Đã hết phòng</p>
                        )}
                      </button>
                      <button className="bg-blue-100 text-blue-800 text-base font-medium me-2 p-4 rounded dark:bg-blue-900 dark:text-blue-300">
                        <p>Số lượng phòng đã được đặt</p>
                        {room.bookedRooms ? (
                          <p>{room.bookedRooms} / phòng</p>
                        ) : (
                          <p className="text-red-700">
                            Chưa có phòng nào được đặt
                          </p>
                        )}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="">
            <h2 className="text-2xl font-bold mb-4">Danh sách các hóa đơn</h2>
            <div>
              {booking ? (
                <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                  <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th scope="col" className="px-6 py-3 w-5">
                        STT
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/4">
                        Tên khách hàng
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/5">
                        Thời gian
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/5">
                        Thanh toán
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/5">
                        Trạng thái
                      </th>
                      <th scope="col" className="px-6 py-3 w-1/5">
                        Tổng tiền
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {booking?.map((product, index) => (
                      <React.Fragment key={product._id}>
                        <tr
                          className="bg-white border-b text-base dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer"
                          onClick={() => toggleProductDetails(product._id)}
                        >
                          <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-wrap">
                            {index + 1}
                          </td>
                          <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-wrap">
                            <p>{product.customer?.customer_name}</p>
                            <p className="mt-2 text-xs">
                              Email: {product.customer?.customer_email}
                            </p>
                          </td>
                          <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-wrap">
                            <div>
                              <p className="text-base text-gray-700">
                                Nhận phòng: {product.checkInDate}
                              </p>
                              <p className="text-base text-gray-700">
                                Trả phòng: {product.checkOutDate}
                              </p>
                            </div>
                          </td>
                          <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-wrap">
                            <div className="flex items-center">
                              {product.payment?.paymentStatus === "success" ? (
                                <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Đã thanh toán
                                </span>
                              ) : (
                                <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Chưa thanh toán
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-wrap">
                            <div className="flex items-center">
                              {product.hold_status === "released" ? (
                                <span className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Xác nhận
                                </span>
                              ) : (
                                <span className="bg-red-100 text-red-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-indigo-900 dark:text-indigo-300">
                                  Đang xử lý
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4 overflow-hidden text-ellipsis whitespace-nowrap">
                            {formatCurrency(product.payment?.amount) || "N/A"}{" "}
                            VND
                          </td>
                        </tr>
                        {expandedProductId === product._id && (
                          <tr className="bg-gray-100 dark:bg-gray-700">
                            <td
                              colSpan="6"
                              className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200"
                            >
                              <div className="m-2">
                                <h1 className="text-sm text-gray-700 uppercase font-bold pb-2">
                                  Địa chỉ
                                </h1>
                                <span className="ml-2">
                                  {product.hotelID?.hotel_address}
                                </span>
                              </div>
                              <div className="m-2">
                                <h1 className="text-sm text-gray-700 uppercase font-bold pb-2">
                                  Số lượng phòng
                                </h1>
                                <div className="flex flex-wrap ml-2">
                                  {product.rooms.map((roomName, index) => (
                                    <span className="w-full my-1" key={index}>
                                      <span className="font-bold">
                                        {roomName.quantity} -{" "}
                                      </span>
                                      <span className="flex-1">
                                        {roomName.roomId.room_type}
                                      </span>
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="m-2">
                                <h1 className="text-sm text-gray-700 uppercase font-bold pb-2">
                                  Yêu cầu đặc biệt
                                </h1>
                                <span className="ml-2">
                                  {product.customer_note}
                                </span>
                              </div>
                              {product.payment?.paymentStatus !== "success" && (
                                <div>
                                  <Button className="bg-gray-100 text-gray-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-gray-400 border border-gray-500">
                                    Hủy
                                  </Button>
                                  <Button className="bg-green-100 text-green-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                                    Xác nhận thanh toán
                                  </Button>
                                </div>
                              )}
                            </td>
                          </tr>
                        )}
                      </React.Fragment>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div>Chưa có vé nào được đặt</div>
              )}
            </div>
          </div>
          <div className="mt-5">
            <h2 className="text-2xl font-bold mb-4">Thống kê doanh thu</h2>
          </div>
        </div>
      ))}
    </div>
  );
};
export default MyHotel;
