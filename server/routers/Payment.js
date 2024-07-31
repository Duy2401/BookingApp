const middlewareControlle = require("../controllers/middlewareController");
const paymentController = require("../controllers/paymentController");
const router = require("express").Router();

router.post("/momo-payment", paymentController.createBooking);
router.get("/callback", paymentController.returnBooking);
router.post("/check-status-transaction", paymentController.returnBooking);

module.exports = router;
