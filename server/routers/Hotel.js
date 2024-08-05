const router = require('express').Router();
const upload = require('../configs/multer2');
const middlewareControlle = require('../controllers/middlewareController');
const HotelsController = require('../controllers/Service/hotelController');
// Hotel
router.post(
  '/createhotel',
  upload.fields([{ name: 'description_images', maxCount: 10 }]),
  middlewareControlle.verifyToken,
  HotelsController.CreateHotel
);
router.put(
  '/editHotel/:id',
  middlewareControlle.verifyToken,
  HotelsController.EditHotel
);
router.delete(
  '/delete/:id',
  middlewareControlle.verifyToken,
  HotelsController.DeleteHotel
);
// GET ALL HOTEL OF PARTNER
router.get('/listhotels/:id', HotelsController.GetHotelOfPartner);
// SEARCH AND GET DETAILS HOTEL
router.get('/searchhotel/:address', HotelsController.SearchHotels);
router.get('/gethoteldetail/:id', HotelsController.GetHotels);

// Type Rooms
router.post(
  '/createroomtype',
  middlewareControlle.verifyToken,
  HotelsController.CreateRoomType
);
router.put(
  '/editroomtype/:id',
  middlewareControlle.verifyToken,
  HotelsController.EditRoomType
);
router.delete(
  '/deleteroomtype/:id',
  middlewareControlle.verifyToken,
  HotelsController.DeleteRoomType
);

module.exports = router;
