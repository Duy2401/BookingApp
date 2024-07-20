const Hotels = require("../models/Hotel/hotels");
const HotelsType = require("../models/Hotel/hotelType");
const streamifier = require("streamifier");
const cloudinary = require("../configs/cloudinary");
const HotelsController = {
  // Business Partners create my hotel
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
      return res.status(201).json(newHotel);
    } catch (error) {
      return res.status(500).json({
        status: false,
        message: "Create Hotel not successful",
        data: error,
      });
    }
  },
  // Edit Infor of Hotel
  EditHotel: async (req, res) => {
    try {
      const EditHotels = await Hotels.findById(req.params.id);
      // Case have images of hotel
      await EditHotels.updateOne({ $set: req.body });
      return res.status(200).json("Edit Infor Hotel Success");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Delete hotel
  DeleteHotel: async (req, res) => {
    try {
      await Hotels.findByIdAndDelete(req.params.id);
      return res.status(200).json("Delete Hotel Success");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Create type hotel
  CreateHotelType: async (req, res) => {
    try {
      const newHotelType = new HotelsType({
        HotelTypes_id: req.body.HotelTypes_id,
        HotelTypes_name: req.body.HotelTypes_name,
        HotelTypes_desc: [
          {
            desc_id: req.body.desc_id,
            desc_title: req.body.desc_title,
            desc_prices: req.body.desc_prices,
            availableRooms: req.body.availableRooms,
          },
        ],
      });
      const hotelType = await newHotelType.save();
      return res.status(200).json(hotelType);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Edit Infor of Hotel Type
  EditHotelsType: async (req, res) => {
    try {
      const EditHoteltype = await HotelsType.findById(req.params.id);
      await EditHoteltype.updateOne({ $set: req.body });
      return res.status(200).json("Edit Hotel Type  Success");
    } catch (error) {
      return res.status(500).json(error);
    }
  },

  // Get hotel
  GetAll,
};

module.exports = HotelsController;
