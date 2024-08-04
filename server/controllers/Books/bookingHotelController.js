const HotelBooking = require("../../models/Booking/HotelBooking");
const RoomType = require("../../models/Hotel/roomType");
const Payment = require("../../models/PaymentSchema");
const mongoose = require("mongoose");
const BookingController = {
  // Tạo đặt phòng mới
  createBookingCash: async (req, res) => {
    try {
      const { customer, hotelID, rooms, totalPrice } = req.body;

      const updatedRooms = [];

      for (const room of rooms) {
        const { roomId, quantity } = room;

        const roomType = await RoomType.findOneAndUpdate(
          { _id: roomId, totalRooms: { $gte: quantity } },
          { $inc: { totalRooms: -quantity, bookedRooms: quantity } },
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
        ...req.body,
        customer,
        hotelID,
        rooms: updatedRooms,
        hold_status: "released",
        payment_status: "pending",
      });

      const CreateHotelBooking = await newBooking.save();

      const newPayment = new Payment({
        orderId: CreateHotelBooking._id,
        amount: totalPrice,
        paymentStatus: "pending",
        type: "hotel",
      });
      await newPayment.save();
      return res.status(201).json({
        status: true,
        message: "create booking hotel cash is success",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error create booking hotel cash", data: error });
    }
  },

  // Lấy thông tin đơn đặt phòng
  getBooking: async (req, res) => {
    const customerId = new mongoose.Types.ObjectId(req.params.id);
    try {
      // Find all hotel bookings for the specified customer
      const hotelBookings = await HotelBooking.find({
        customer: customerId,
      })
        .populate("hotelID")
        .populate({
          path: "rooms",
          populate: { path: "roomId" },
        })
        .lean();

      if (hotelBookings.length === 0) {
        return res.status(404).json({
          status: false,
          message: "No bookings found for this customer",
        });
      }

      // Extract all orderIds from hotelBookings
      const orderIds = hotelBookings.map((booking) => booking._id);

      // Find all payments related to these bookings
      const payments = await Payment.find({
        orderId: { $in: orderIds },
      }).lean();

      // Create a map of payments by orderId for easy lookup
      const paymentMap = payments.reduce((map, payment) => {
        map[payment.orderId.toString()] = payment;
        return map;
      }, {});

      // Combine hotel bookings with their related payments
      const combinedBookings = hotelBookings.map((booking) => ({
        ...booking,
        payment: paymentMap[booking._id.toString()] || null,
      }));

      return res.json({
        status: true,
        message: "Get Data",
        data: combinedBookings,
      });
    } catch (error) {
      console.error("Error fetching booking:", error);
      return res
        .status(500)
        .json({ status: false, message: "Error fetching booking", error });
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
