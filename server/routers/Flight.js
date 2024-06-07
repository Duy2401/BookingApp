const FlightController = require("../controllers/flightController");
const router = require("express").Router();

// Business Partners create my flight
router.post("/createflight", FlightController.CreateFlight);
// Edit Infor of flight
router.put("/editflight/:id", FlightController.EditFlight);
// Delete flight
router.delete("/deteleflight/:id", FlightController.DeleteFlight);
// Create type flight
router.post("/createflighttype", FlightController.CreateFlightType);
// Edit Infor of flight Type
router.put("/editflighttype/:id", FlightController.EditFlightTypes);
module.exports = router;
