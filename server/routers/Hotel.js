const HotelsController = require("../controllers/hotelController");
const router = require("express").Router();
const middlewareControlle = require("../controllers/middlewareController");
const upload = require("../configs/multer");
// Business Partners create my hotel
router.post(
  "/createhotel",
  upload.array("description_images"),
  // middlewareControlle.verifyToken,
  HotelsController.CreateHotel
);

// Edit Infor of Hotel
router.put("/editHotel/:id", HotelsController.EditHotel);

// Delete hotel
router.delete("/delete/:id", HotelsController.DeleteHotel);

// Create type hotel
router.post("/createhoteltype", HotelsController.CreateHotelType);

// Edit Infor of Hotel Type
router.put("/edithoteltype/:id", HotelsController.EditHotelsType);

module.exports = router;
