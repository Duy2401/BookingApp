const HotelsController = require("../controllers/hotelController");
const router = require("express").Router();
const upload = require("../configs/multer2");
const middlewareControlle = require("../controllers/middlewareController");
// Business Partners create my hotel
router.post(
  "/createhotel",
  upload.array("description_images", 10),
  middlewareControlle.verifyToken,
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
