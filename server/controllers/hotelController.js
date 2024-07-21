const Hotels = require("../models/Hotel/hotels");
const HotelsType = require("../models/Hotel/hotelType");
const streamifier = require("streamifier");
const cloudinary = require("../configs/cloudinary");
const RoomType = require("../models/Hotel/roomType");
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
        hotel_price: req.body.hotel_price,
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

  // HOTEL TYPES
  CreateHotelType: async (req, res) => {
    try {
      const newHotelType = new HotelsType({
        HotelTypes_id: req.body.HotelTypes_id,
        HotelTypes_name: req.body.HotelTypes_name,
      });
      const hotelType = await newHotelType.save();
      return res.status(200).json({
        status: true,
        message: "Create HotelType successful",
        data: hotelType,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Create HotelType not successful",
        data: error,
      });
    }
  },
  EditHotelsType: async (req, res) => {
    try {
      const EditHoteltype = await HotelsType.findById(req.params.id);
      await EditHoteltype.updateOne({ $set: req.body });
      return res.status(200).json({
        status: true,
        message: "Edit HotelType successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Edit HotelType not successful",
        data: error,
      });
    }
  },
  DeleteHotelsType: async (req, res) => {
    try {
      await HotelsType.findByIdAndDelete(req.params.id);
      return res.status(200).json({
        status: true,
        message: "Delete HotelType successful",
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Delete HotelType not successful",
        data: error,
      });
    }
  },

  // ROOM TYPES
  CreateRoomType: async (req, res) => {
    try {
      const roomTypes = JSON.parse(req.body.room_types); // Assuming room_types is a JSON string
      const newRoomTypes = roomTypes.map((roomTypeData) => ({
        hotel_id: req.body.hotel_id,
        ...roomTypeData,
      }));

      const savedRoomTypes = await RoomType.insertMany(newRoomTypes);
      return res.status(200).json({
        status: true,
        message: "Create RoomType successful",
        data: savedRoomTypes,
      });
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Create RoomType not successful",
        data: error,
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
