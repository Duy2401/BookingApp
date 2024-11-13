const Hotels = require('../../models/Hotel/hotels');
const streamifier = require('streamifier');
const cloudinary = require('../../configs/cloudinary');
const RoomType = require('../../models/Hotel/roomType');
const Review = require('../../models/review');
const mongoose = require('mongoose');
const HotelsController = {
  // HOTELS
  CreateHotel: async (req, res) => {
    try {
      const descriptionImages = [];
      if (req.files && req.files['description_images']) {
        for (const file of req.files['description_images']) {
          if (!file.buffer) continue;
          try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { upload_preset: 'ml_default', folder: 'booking-image' },
                (error, result) => {
                  if (error) {
                    console.error(
                      `Cloudinary upload error for file ${file.originalname}:`,
                      error
                    );
                    return reject(new Error('Failed to upload image'));
                  }
                  console.log(
                    `Successfully uploaded ${file.originalname} to Cloudinary.`
                  );
                  resolve(result.secure_url);
                }
              );
              streamifier.createReadStream(file.buffer).pipe(uploadStream);
            });

            descriptionImages.push({ name_image: result });
          } catch (uploadError) {
            console.error(
              `Error uploading file ${file.originalname}:`,
              uploadError
            );
          }
        }
      } else {
        console.error('No files found in req.files');
      }
      const descriptionNote = JSON.parse(req.body.description_note);
      const descriptionGeneralRules = JSON.parse(
        req.body.description_generalRules
      );
      const descriptionAmenities = req.body.description_amenities || [];
      const priceNumber = parseFloat(
        req.body.hotel_price.replace(/[^0-9.-]+/g, '')
      );
      const newHotel = new Hotels({
        hotel_name: req.body.hotel_name,
        hotel_address: req.body.hotel_address,
        hotel_descriptive: req.body.hotel_descriptive,
        hotel_type: req.body.hotel_type,
        hotel_description: {
          description_note: descriptionNote,
          description_generalRules: descriptionGeneralRules,
          description_amenities: descriptionAmenities,
          description_images: descriptionImages,
        },
        customers_id_create: req.body.customers_id_create,
        hotel_price: priceNumber,
      });

      await newHotel.save();
      return res.status(201).json({
        status: true,
        message: 'Edit Hotel successful',
        data: newHotel,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Create Hotel not successful',
        data: error,
      });
    }
  },

  EditHotel: async (req, res) => {
    try {
      const EditHotels = await Hotels.findById(req.params.id);
      // Case have images of hotel
      await EditHotels.updateOne({ $set: req.body });
      return res.status(200).json({
        status: true,
        message: 'Edit Hotel successful',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Edit Hotel not successful',
        data: error,
      });
    }
  },

  DeleteHotel: async (req, res) => {
    try {
      await Hotels.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: true,
        message: 'Delete Hotel successful',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Delete Hotel not successful',
        data: error,
      });
    }
  },
  // GET ALL HOTEL OF PARTNER
  GetHotelOfPartner: async (req, res) => {
    try {
      const customerId = new mongoose.Types.ObjectId(req.params.id);
      const listHotel = await Hotels.find({
        customers_id_create: customerId,
      }).populate('room_types');
      return res.status(200).json({
        status: false,
        message: 'Get hotel of partner successful',
        data: listHotel,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Get hotel of partner not successful',
        data: error,
      });
    }
  },
  // SEARCH AND GET DETAILS HOTEL
  GetHotels: async (req, res) => {
    try {
      const hotel = await Hotels.findById(req.params.id)
        .populate('room_types')
        .exec();

      if (!hotel) {
        return res.status(404).json({ error: 'Hotel not found' });
      }
      return res.status(200).json({
        status: true,
        message: 'Get Detail Hotel successful',
        data: hotel,
      });
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
  SearchHotels: async (req, res) => {
    try {
      const searchString = req.params.address.trim().toLowerCase();
      const searchWords = searchString.split(/\s+/);

      // Tìm kiếm ít nhất 1 trong các từ, không phân biệt thứ tự
      const searchRegex = new RegExp(`.*${searchWords.join('|')}.*`, 'i');

      const hotels = await Hotels.find({
        hotel_address: searchRegex,
      })
        .populate('room_types')
        .exec();

      if (hotels.length === 0) {
        return res.status(404).json({
          status: false,
          message: 'There are no hotels in this location',
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: 'Search Hotel successful',
        data: hotels,
      });
    } catch (error) {
      console.error('Search error:', error);
      return res.status(500).json({
        status: false,
        message: 'Search Hotel not successful',
        data: error,
      });
    }
  },

  // ROOM TYPES
  CreateRoomType: async (req, res) => {
    try {
      const { hotel_id, room_types } = req.body;

      const newRooms = room_types.map((room) => ({
        hotel_id,
        room_type: room.room_type,
        price: room.price,
        totalRooms: room.totalRooms,
      }));

      const createdRooms = await RoomType.insertMany(newRooms);

      // Lấy các ID của RoomType mới tạo
      const roomTypeIds = createdRooms.map((room) => room._id);

      await Hotels.findByIdAndUpdate(hotel_id, {
        $push: { room_types: { $each: roomTypeIds } },
      });
      return res.status(200).json({
        status: true,
        message: 'Create RoomType successful',
        data: newRooms,
      });
    } catch (error) {
      console.error('Error creating room types:', error);
      return res.status(500).json({
        status: false,
        message: 'Create RoomType not successful',
        error: error.message,
      });
    }
  },
  EditRoomType: async (req, res) => {
    try {
      const updateFields = { ...req.body };
      const room = await RoomType.findOneAndUpdate(
        { _id: req.params.id },
        updateFields,
        { new: true }
      );
      if (!room) {
        return res.status(404).json({
          status: false,
          message: 'RoomType not found',
        });
      }
      return res.status(200).json({
        status: true,
        message: 'Update RoomType successful',
        data: room,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Update RoomType not successful',
        data: error,
      });
    }
  },
  DeleteRoomType: async (req, res) => {
    try {
      await RoomType.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: true,
        message: 'Delete RoomType successful',
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: 'Delete RoomType not successful',
        data: error,
      });
    }
  },

  // getTopRatedHotels
  getTopRatedHotels: async (req, res) => {
    try {
      // Lấy tất cả reviews và nhóm theo hotel_id
      const reviews = await Review.aggregate([
        {
          $match: { booking_service_type: 'Hotel' }, // Chỉ lấy các review cho dịch vụ Hotel
        },
        {
          $group: {
            _id: '$booking_service_id',
            averageRating: { $avg: '$rating' },
            totalComments: { $sum: 1 },
          },
        },
        {
          $sort: { averageRating: -1, totalComments: -1 }, // Sắp xếp theo rating trung bình và số lượng comment giảm dần
        },
        {
          $limit: 10, // Giới hạn kết quả trả về, ví dụ: top 10 khách sạn
        },
      ]);

      // Lấy thông tin chi tiết của các khách sạn
      const hotelIds = reviews.map((review) => review._id);
      const topHotels = await Hotels.find({ _id: { $in: hotelIds } });

      // Gộp thông tin rating và comment vào thông tin khách sạn
      const result = topHotels.map((hotel) => {
        const review = reviews.find((r) => r._id.equals(hotel._id));
        return {
          ...hotel.toObject(),
          averageRating: review.averageRating,
          totalComments: review.totalComments,
        };
      });

      return res.status(200).json({ status: true, data: result });
    } catch (error) {
      return res.status(500).json({ status: false, error: error.message });
    }
  },
};

module.exports = HotelsController;
