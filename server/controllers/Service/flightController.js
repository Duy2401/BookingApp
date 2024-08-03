const Flight = require("../../models/Flight/Flight");

const FlightController = {
  // Business Partners create flight
  CreateFlight: async (req, res) => {
    try {
      const newFlight = new Flight(req.body);
      await newFlight.save();
      return res.status(201).json({
        status: true,
        message: "Create Flight Success",
        data: newFlight,
      });
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Edit Infor of flight
  EditFlight: async (req, res) => {
    try {
      const EditFlights = await Flight.findById(req.params.id);
      await EditFlights.updateOne({ $set: req.body });
      return res.status(200).json("Edit Infor Hotel Success");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Delete flight
  DeleteFlight: async (req, res) => {
    try {
      await Flight.findByIdAndDelete(req.params.id);
      return res.status(200).json("Delete Flight Success");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Create type flight
  CreateFlightType: async (req, res) => {},
  // Edit Infor of flight Type
  EditFlightTypes: async (req, res) => {},
};
module.exports = FlightController;
