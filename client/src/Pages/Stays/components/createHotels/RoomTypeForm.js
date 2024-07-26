import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddRoomsHotel } from "../../../../redux/hotelsSlice";
import { useParams } from "react-router-dom";

const RoomTypeForm = () => {
  const idHotem = useParams();
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customers?.customers);
  const [formData, setFormData] = useState({
    hotel_id: idHotem.id,
    room_types: [{ room_type: "", price_range: "", availableRooms: 0 }],
  });

  const handleRoomTypeChange = (index, e) => {
    const values = [...formData.room_types];
    values[index][e.target.name] = e.target.value;
    setFormData({
      ...formData,
      room_types: values,
    });
  };

  const handleAddRoomType = () => {
    setFormData({
      ...formData,
      room_types: [
        ...formData.room_types,
        { room_type: "", price_range: "", availableRooms: 0 },
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
    dispatch(AddRoomsHotel({ newRooms: formData, customers }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formData.room_types.map((roomType, index) => (
        <div key={index} className="flex flex-col space-y-2">
          <div className="flex space-x-4">
            <input
              type="text"
              name="room_type"
              placeholder="Room Type"
              value={roomType.room_type}
              onChange={(e) => handleRoomTypeChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
            <input
              type="text"
              name="price_range"
              placeholder="Price Range"
              value={roomType.price_range}
              onChange={(e) => handleRoomTypeChange(index, e)}
              className="border rounded p-2 w-full"
              required
            />
            <input
              type="number"
              name="availableRooms"
              placeholder="Available Rooms"
              value={roomType.availableRooms}
              onChange={(e) => handleRoomTypeChange(index, e)}
              className="border rounded p-2 w-full"
              min="0"
              required
            />
          </div>
          <button
            type="button"
            onClick={() => handleRemoveRoomType(index)}
            className="self-end bg-red-500 text-white p-2 rounded"
          >
            Remove Room Type
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={handleAddRoomType}
        className="bg-blue-500 text-white p-2 rounded"
      >
        Add Room Type
      </button>
      <button type="submit" className="bg-green-500 text-white p-2 rounded">
        Submit
      </button>
    </form>
  );
};

export default RoomTypeForm;
