const middlewareControlle = require("../controllers/middlewareController");
const paymentController = require("../controllers/paymentController");
const router = require("express").Router();

router.post("/momo-payment", paymentController.createBooking);
router.get("/vnpay_return", paymentController.returnBooking);
router.get("/vnpay_ipn", paymentController.returnBooking);

module.exports = router;
