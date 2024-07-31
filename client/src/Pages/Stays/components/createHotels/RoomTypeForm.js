import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddRoomsHotel } from "../../../../redux/hotelsSlice";
import { useParams } from "react-router-dom";

const RoomTypeForm = () => {
  const idHotel = useParams();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [formData, setFormData] = useState({
    hotel_id: idHotel.id,
    room_types: [
      { room_type: "", price_range: "", availableRooms: 0, displayPrice: "" },
    ],
  });

  const formatCurrency = (value) => {
    if (!value) return ""; // Xử lý input rỗng
    const numericValue = parseFloat(value.replace(/[^0-9.-]+/g, ""));
    if (isNaN(numericValue)) return "NaN ₫";
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numericValue);
  };

  const handleRoomTypeChange = (index, e) => {
    const { name, value } = e.target;
    const updatedRoomTypes = [...formData.room_types];
    updatedRoomTypes[index][name] = value;
    if (name === "price_range") {
      updatedRoomTypes[index].displayPrice = formatCurrency(value);
    }
    setFormData({ ...formData, room_types: updatedRoomTypes });
  };

  const handleAddRoomType = () => {
    setFormData({
      ...formData,
      room_types: [
        ...formData.room_types,
        { room_type: "", price_range: "", availableRooms: 0, displayPrice: "" },
      ],
    });
  };

  const handleRemoveRoomType = (index) => {
    const values = [...formData.room_types];
    values.splice(index, 1);
    setFormData({
      ...formData,
      room_types: values,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanedData = {
      ...formData,
      room_types: formData.room_types.map((roomType) => ({
        room_type: roomType.room_type,
        price_range: parseFloat(roomType.price_range.replace(/[^0-9.-]+/g, "")),
        availableRooms: roomType.availableRooms,
      })),
    };
    dispatch(AddRoomsHotel({ newRooms: cleanedData, customers }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 p-6 bg-white rounded-lg shadow-md"
    >
      {formData.room_types.map((roomType, index) => (
        <div key={index} className="flex flex-col space-y-4">
          <div className="flex space-x-4">
            <input
              type="text"
              name="room_type"
              placeholder="Room Type"
              value={roomType.room_type}
              onChange={(e) => handleRoomTypeChange(index, e)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              required
            />
            <div className="flex-5">
              <label className="block text-gray-700 mb-1">Price:</label>
              <input
                type="text"
                name="price_range"
                value={roomType.price_range}
                onChange={(e) => handleRoomTypeChange(index, e)}
                required
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              />
              <div className="mt-1 text-gray-600">{roomType.displayPrice}</div>
            </div>
            <input
              type="number"
              name="availableRooms"
              placeholder="Available Rooms"
              value={roomType.availableRooms}
              onChange={(e) => handleRoomTypeChange(index, e)}
              className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring focus:border-blue-300"
              min="0"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveRoomType(index)}
            className="self-end bg-red-500 text-white py-1 px-3 rounded focus:outline-none focus:ring focus:ring-red-300"
          >
            Remove Room Type
          </button>
        </div>
      ))}
      <div className="flex space-x-4">
        <button
          type="button"
          onClick={handleAddRoomType}
          className="bg-blue-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-blue-300"
        >
          Add Room Type
        </button>
        <button
          type="submit"
          className="bg-green-500 text-white py-2 px-4 rounded focus:outline-none focus:ring focus:ring-green-300"
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default RoomTypeForm;
