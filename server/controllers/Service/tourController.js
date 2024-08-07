const TourPackage = require("../../models/Tours/toursPackage");

const TourController = {
  CreateTour: async (req, res) => {
    try {
      const newTour = await TourPackage({
        tour_id: req.body.tour_id,
        tour_name: req.body.tour_name,
        tour_address: req.body.tour_address,
        tour_descriptive: req.body.tour_descriptive,
        tour_description: {
          description_note: [
            {
              note_title: req.body.note_title,
              note_content: req.body.note_content,
            },
          ],
          description_noteMore: [
            {
              rules_title: req.body.rules_title,
              rules_content: req.body.rules_content,
            },
          ],
          description_amenities: req.body.description_amenities,
          description_image: req.body.description_image,
        },
        Tour_Type: req.body.Tour_Type,
      });
      const tours = await newTour.save();
      return res.status(200).json(tours);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  EditTour: async (req, res) => {
    try {
      const EditTour = await TourPackage.findById(req.params.id);
      await EditTour.updateOne({ $set: req.body });
      return res.status(200).json("Edit Tour Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  DeleteTour: async (req, res) => {
    try {
      await TourPackage.findByIdAndDelete(req.params.id);
      return res.status(200).json("Delete Tour Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  CreateTypeTour: async (req, res) => {},
  EditTypeTour: async (req, res) => {},
  DeleteTypeTour: async (req, res) => {},
};
module.exports = TourController;
