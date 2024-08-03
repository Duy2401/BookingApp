const Hotels = require("../../models/Hotel/hotels");
const streamifier = require("streamifier");
const cloudinary = require("../../configs/cloudinary");
const RoomType = require("../../models/Hotel/roomType");

const HotelsController = {
  // HOTELS
  CreateHotel: async (req, res) => {
    try {
      const descriptionImages = [];
      if (req.files && req.files["description_images"]) {
        for (const file of req.files["description_images"]) {
          if (!file.buffer) continue;
          try {
            const result = await new Promise((resolve, reject) => {
              const uploadStream = cloudinary.uploader.upload_stream(
                { upload_preset: "ml_default", folder: "booking-image" },
                (error, result) => {
                  if (error) {
                    console.error(
                      `Cloudinary upload error for file ${file.originalname}:`,
                      error
                    );
                    return reject(new Error("Failed to upload image"));
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
        console.error("No files found in req.files");
      }
      const descriptionNote = JSON.parse(req.body.description_note);
      const descriptionGeneralRules = JSON.parse(
        req.body.description_generalRules
      );
      const descriptionAmenities = req.body.description_amenities || [];
      const priceNumber = parseFloat(
        req.body.hotel_price.replace(/[^0-9.-]+/g, "")
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
        message: "Edit Hotel successful",
        data: newHotel,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Create Hotel not successful",
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
        message: "Edit Hotel successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Edit Hotel not successful",
        data: error,
      });
    }
  },

  DeleteHotel: async (req, res) => {
    try {
      await Hotels.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: true,
        message: "Delete Hotel successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Delete Hotel not successful",
        data: error,
      });
    }
  },

  GetHotels: async (req, res) => {
    try {
      const hotel = await Hotels.findById(req.params.id)
        .populate("room_types")
        .exec();

      if (!hotel) {
        return res.status(404).json({ error: "Hotel not found" });
      }
      return res.status(200).json({
        status: true,
        message: "Get Detail Hotel successful",
        data: hotel,
      });
    } catch (error) {
      return res.status(500).json({ error: "Internal server error" });
    }
  },
  SearchHotels: async (req, res) => {
    try {
      const searchString = req.params.address.trim().toLowerCase();
      const searchWords = searchString.split(/\s+/);

      // Tìm kiếm ít nhất 1 trong các từ, không phân biệt thứ tự
      const searchRegex = new RegExp(`.*${searchWords.join("|")}.*`, "i");

      const hotels = await Hotels.find({
        hotel_address: searchRegex,
      }).exec();

      if (hotels.length === 0) {
        return res.status(404).json({
          status: false,
          message: "There are no hotels in this location",
          data: null,
        });
      }

      return res.status(200).json({
        status: true,
        message: "Search Hotel successful",
        data: hotels,
      });
    } catch (error) {
      console.error("Search error:", error);
      return res.status(500).json({
        status: false,
        message: "Search Hotel not successful",
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
        message: "Create RoomType successful",
        data: newRooms,
      });
    } catch (error) {
      console.error("Error creating room types:", error);
      return res.status(500).json({
        status: false,
        message: "Create RoomType not successful",
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
          message: "RoomType not found",
        });
      }
      return res.status(200).json({
        status: true,
        message: "Update RoomType successful",
        data: room,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Update RoomType not successful",
        data: error,
      });
    }
  },
  DeleteRoomType: async (req, res) => {
    try {
      await RoomType.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: true,
        message: "Delete RoomType successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Delete RoomType not successful",
        data: error,
      });
    }
  },
};

module.exports = HotelsController;
