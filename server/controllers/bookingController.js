const Booking = require("../models/Booking/booking");
const TicketFlight = require("../models/Booking/ticketFlight");
const sendPaymentSuccessEmail = require("../configs/momo/sendEmail");
const BookingController = {
  createBooking: async (req, res) => {
    const {
      hotelId,
      userId,
      roomType,
      checkInDate,
      checkOutDate,
      totalAmount,
      paymentMethod, // Thêm thuộc tính paymentMethod nếu cần thiết
    } = req.body;

    try {
      // Tạo một booking mới
      const newBooking = new Booking({
        hotelId,
        userId,
        roomType,
        checkInDate,
        checkOutDate,
        totalAmount,
        status: paymentMethod === "online" ? "pending" : "confirmed", // Đặt trạng thái dựa trên phương thức thanh toán
      });

      // Lưu booking vào cơ sở dữ liệu
      await newBooking.save();

      // Gửi email xác nhận thanh toán thành công
      await sendPaymentSuccessEmail.send(newBooking);

      return res.json({
        message: "Payment initiated successfully",
        data: newBooking,
      });
    } catch (error) {
      return res.status(500).json({ message: "Error creating booking", error });
    }
  },
  handleMoMoNotify: async (req, res) => {
    const {
      partnerCode,
      orderId,
      requestId,
      amount,
      orderInfo,
      orderType,
      transId,
      resultCode,
      message,
      payType,
      responseTime,
      extraData,
      signature,
    } = req.body;

    const isValidSignature = verifyMoMoSignature(req.body);

    if (!isValidSignature) {
      return res.status(400).send("Invalid signature");
    }

    try {
      const booking = await Booking.findById(orderId).populate(
        "hotelId userId"
      );

      if (!booking) {
        return res.status(404).send("Booking not found");
      }

      if (resultCode === 0) {
        booking.paymentStatus = "Paid";
        booking.paymentTransactionId = transId;
        await booking.save();

        const bookingDetails = {
          bookingId: booking._id,
          hotelName: booking.hotelId.hotel_name,
          roomType: booking.roomType,
          checkInDate: booking.checkInDate,
          checkOutDate: booking.checkOutDate,
          totalAmount: booking.totalAmount,
        };

        const userEmail = booking.userId.email;
        await sendPaymentSuccessEmail(userEmail, bookingDetails);
      } else {
        booking.paymentStatus = "Failed";
        await booking.save();
      }

      res.status(200).send("Notification received");
    } catch (error) {
      res.status(500).send("Error processing notification");
    }
  },

  UpdateBooking: async (req, res) => {
    try {
      const editBookingHotel = await BookingHotel.findById(req.params.id);
      await editBookingHotel.updateOne({ $set: req.body });
      return res.status(200).json("Update Booking Hotel Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetBooking: async (req, res) => {
    try {
      const booking = await Booking.findById(req.params.id)
        .populate("Booking_service_id")
        .populate("Booking_customer_id");
      return res.status(200).json(booking);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  GetAllBooking: async (req, res) => {
    try {
      const bookings = await Booking.find()
        .populate("Booking_service_id")
        .populate("Booking_customer_id");
      return res.status(200).json(bookings);
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  CreateTicketFlight: async (req, res) => {
    try {
      const newTicketFlight = new TicketFlight({
        TicketFlight_id: req.body.TicketFlight_id,
        TicketFlight_customer_id: req.body.TicketFlight_customer_id,
        TicketFlight_date: req.body.TicketFlight_date,
        QuantityPeople: {
          adult: req.body.adult,
          child: req.body.child,
          AgeChild: req.body.AgeChild,
        },
        PaymentMethod: req.body.PaymentMethod,
        TicketFlight_status: req.body.TicketFlight_status,
      });
      const ticketflight = await newTicketFlight.save();
      return res.status(200).json(ticketflight);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  UpdateTicketFlight: async (req, res) => {
    try {
      const editTicketFlight = await TicketFlight.findById(req.params.id);
      await editTicketFlight.updateOne({ $set: req.body });
      return res.status(200).json("Update Booking Tour Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = BookingController;
