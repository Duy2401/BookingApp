const Flight = require("../models/Flight/Flight");
const FlightTypes = require("../models/Flight/FlightType");

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
  CreateFlightType: async (req, res) => {
    try {
      const newTypeFlight = new FlightTypes({
        FlightTypes_id: req.body.FlightTypes_id,
        FlightTypes_name: req.body.FlightTypes_name,
        FlightTypes_desc: {
          desc_id: req.body.desc_id,
          desc_title: req.body.desc_title,
          desc_prices: req.body.desc_prices,
          availableSeats: req.body.availableSeats,
        },
      });
      const typeFlight = await newTypeFlight.save();
      return res.status(200).json(typeFlight);
    } catch (error) {
      return res.status(500).json(error);
    }
  },
  // Edit Infor of flight Type
  EditFlightTypes: async (req, res) => {
    try {
      const EditFlightTypes = await FlightTypes.findById(req.params.id);
      await EditFlightTypes.updateOne({ $set: req.body });
      return res.status(200).json("Edit Flight Type Successfully");
    } catch (error) {
      return res.status(500).json(error);
    }
  },
};
module.exports = FlightController;
