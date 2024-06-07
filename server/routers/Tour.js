const TourController = require("../controllers/tourController");
const router = require("express").Router();

router.post("/createtour", TourController.CreateTour);
router.put("/edittour/:id", TourController.EditTour);
router.delete("/deletetour/:id", TourController.DeleteTour);

router.post("/createtypetour", TourController.CreateTypeTour);
router.put("/edittypetour/:id", TourController.EditTypeTour);
router.delete("/deletetypetour/:id", TourController.CreateTour);

module.exports = router;
