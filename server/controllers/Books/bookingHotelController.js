const HotelBooking = require("../../models/Booking/HotelBooking");
const RoomType = require("../../models/Hotel/roomType");

const BookingController = {
  // Tạo đặt phòng mới
  createBooking: async (req, res) => {
    try {
      const { customer, booking_type, booking_reference, rooms } = req.body;
      const holdDuration = 30 * 60 * 1000; // 30 minutes in milliseconds
      const holdUntil = new Date(Date.now() + holdDuration);

      const updatedRooms = [];

      for (const room of rooms) {
        const { roomId, quantity } = room;

        // Reduce available rooms
        const roomType = await RoomType.findOneAndUpdate(
          {
            "room_types._id": roomId,
            "room_types.isAvailable": true,
            "room_types.availableRooms": { $gte: quantity },
          },
          { $inc: { "room_types.$.availableRooms": -quantity } },
          { new: true }
        );

        if (!roomType) {
          return res.status(400).json({
            status: false,
            message: `No available rooms for the specified room type: ${roomId}`,
          });
        }
        updatedRooms.push({ roomId, quantity });
      }

      const newBooking = new HotelBooking({
        customer,
        booking_type,
        booking_reference,
        rooms: updatedRooms,
        hold_until: holdUntil,
        hold_status: "on_hold",
      });

      await newBooking.save();

      res.status(201).json({
        status: true,
        message: "Create booking hotel is success",
        data: newBooking,
      });
    } catch (error) {
      res.status(500).json({ message: "Error creating booking", data: error });
    }
  },

  // Lấy thông tin đơn đặt phòng
  getBooking: async (req, res) => {
    try {
      const booking = await HotelBooking.findById(req.params.id).populate(
        "booking_reference"
      );
      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error fetching booking", error });
    }
  },

  // Cập nhật trạng thái thanh toán
  updatePaymentStatus: async (req, res) => {
    try {
      const { payment_status } = req.body;
      const booking = await HotelBooking.findByIdAndUpdate(
        req.params.id,
        {
          payment_status,
          updateDate: Date.now(),
        },
        { new: true }
      );

      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error updating payment status", error });
    }
  },

  // Xóa đơn đặt phòng
  deleteBooking: async (req, res) => {
    try {
      const booking = await HotelBooking.findByIdAndDelete(req.params.id);
      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      res.json({ message: "Booking deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting booking", error });
    }
  },

  // Giải phóng phòng đã hết hạn giữ
  releaseExpiredHolds: async () => {
    try {
      const now = new Date();
      const expiredBookings = await HotelBooking.find({
        hold_status: "on_hold",
        hold_until: { $lte: now },
      });

      for (let booking of expiredBookings) {
        booking.hold_status = "released";

        // Tăng lại số lượng phòng có sẵn khi giải phóng
        await RoomType.findOneAndUpdate(
          { "room_types._id": booking.roomId },
          { $inc: { "room_types.$.availableRooms": 1 } }
        );

        await booking.save();
        console.log(`Released hold for booking ID: ${booking._id}`);
      }
    } catch (error) {
      console.error("Error releasing expired holds:", error);
    }
  },

  // Thay đổi trạng thái giữ phòng
  updateHoldStatus: async (req, res) => {
    try {
      const { hold_status } = req.body;
      const booking = await HotelBooking.findByIdAndUpdate(
        req.params.id,
        {
          hold_status,
          updateDate: Date.now(),
        },
        { new: true }
      );

      if (!booking)
        return res.status(404).json({ message: "Booking not found" });
      res.json(booking);
    } catch (error) {
      res.status(500).json({ message: "Error updating hold status", error });
    }
  },
};

module.exports = BookingController;
