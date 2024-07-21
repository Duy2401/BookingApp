const HotelsController = require("../controllers/hotelController");
const router = require("express").Router();
const upload = require("../configs/multer2");
const middlewareControlle = require("../controllers/middlewareController");
// Hotel
router.post(
  "/createhotel",
  upload.fields([{ name: "description_images", maxCount: 10 }]),
  middlewareControlle.verifyToken,
  HotelsController.CreateHotel
);
router.put("/editHotel/:id", HotelsController.EditHotel);
router.delete("/delete/:id", HotelsController.DeleteHotel);

// Type hotel
router.post("/createhoteltype", HotelsController.CreateHotelType);
router.put("/edithoteltype/:id", HotelsController.EditHotelsType);
router.delete("/deletehoteltype/:id", HotelsController.DeleteHotelsType);

// Type Rooms
router.post("/createroomtype", HotelsController.CreateRoomType);
router.put("/editroomtype/:id", HotelsController.EditRoomType);
router.delete("/deleteroomtype/:id", HotelsController.DeleteRoomType);

module.exports = router;
