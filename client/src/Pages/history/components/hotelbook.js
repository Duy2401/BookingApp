import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooking } from "../../../redux/bookingsSlice";

const HotelBook = () => {
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [booking, setBooking] = useState([]);

  const [expandedProductId, setExpandedProductId] = useState(null);
  const toggleProductDetails = (productId) => {
    setExpandedProductId(expandedProductId === productId ? null : productId);
  };
  const formatCurrency = (value) => {
    return new Intl.NumberFormat("vi-VN", {
      currency: "VND",
    }).format(value);
  };
  useEffect(() => {
    const getBill = async () => {
      const result = await dispatch(getBooking(customers));
      setBooking(result.payload?.data);
    };
    getBill();
  }, [dispatch, customers]);
  console.log(booking);
  return (
    <div className="container mx-auto p-2 ml-2 mt-5 rounded-lg shadow-lg border-2">
      {booking ? (
        <table className="table-fixed w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-sm text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3 w-5">
                STT
              </th>
              <th scope="col" className="px-6 py-3 w-1/4">
                Tên Khách sạn
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
                    {product.hotelID?.hotel_name}
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
                    {formatCurrency(product.payment?.amount) || "N/A"} VND
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
                        <span className="ml-2">{product.customer_note}</span>
                      </div>
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
  );
};

export default HotelBook;
