const router = require("express").Router();
const upload = require("../configs/multer2");
const middlewareControlle = require("../controllers/middlewareController");
const HotelsController = require("../controllers/Service/hotelController");
// Hotel
router.post(
  "/createhotel",
  upload.fields([{ name: "description_images", maxCount: 10 }]),
  middlewareControlle.verifyToken,
  HotelsController.CreateHotel
);
router.put(
  "/editHotel/:id",
  middlewareControlle.verifyToken,
  HotelsController.EditHotel
);
router.delete(
  "/delete/:id",
  middlewareControlle.verifyToken,
  HotelsController.DeleteHotel
);

router.get("/searchhotel/:address", HotelsController.SearchHotels);
router.get("/gethoteldetail/:id", HotelsController.GetHotels);

// Type hotel
middlewareControlle.verifyToken,
  router.post(
    "/createhoteltype",
    middlewareControlle.verifyToken,
    HotelsController.CreateHotelType
  );
router.get("/getallhoteltype", HotelsController.GetAllHotelsType);
middlewareControlle.verifyToken,
  router.delete(
    "/deletehoteltype/:id",
    middlewareControlle.verifyToken,
    HotelsController.DeleteHotelsType
  );

// Type Rooms
router.post(
  "/createroomtype",
  middlewareControlle.verifyToken,
  HotelsController.CreateRoomType
);
router.put(
  "/editroomtype/:id",
  middlewareControlle.verifyToken,
  HotelsController.EditRoomType
);
router.delete(
  "/deleteroomtype/:id",
  middlewareControlle.verifyToken,
  HotelsController.DeleteRoomType
);

module.exports = router;
