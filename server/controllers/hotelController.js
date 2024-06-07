const Hotels = require("../models/Hotel/hotels");
const HotelsType = require("../models/Hotel/hotelType");

const HotelsController = {
  // Business Partners create my hotel
  CreateHotel: async (req, res) => {
    try {
      const newHotel = new Hotels({
        hotel_id: req.body.hotel_id,
        hotel_name: req.body.hotel_name,
        hotel_address: req.body.hotel_address,
        hotel_descriptive: req.body.hotel_descriptive,
        hotel_description: {
          description_note: {
            note_title: req.body.note_title,
            note_content: req.body.note_content,
          },
          description_generalRuleS: {
            rules_title: req.body.rules_title,
            rules_content: req.body.rules_content,
          },
          description_amenities: req.body.description_amenities,
          description_image: req.body.description_image,
        },
        customers_id_create: req.body.customers_id_create,
        hotel_type: req.body.hotel_type,
      });
      const hotels = await newHotel.save();
      return res.status(200).json(hotels);
    } catch (error) {
      return res.status(500).json(error);
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
        HotelTypes_desc: {
          desc_id: req.body.desc_id,
          desc_title: req.body.desc_title,
          desc_prices: req.body.desc_prices,
          availableRooms: req.body.availableRooms,
        },
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
};

module.exports = HotelsController;
