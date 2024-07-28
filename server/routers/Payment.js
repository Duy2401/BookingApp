const middlewareControlle = require("../controllers/middlewareController");
const Payment = require("../controllers/paymentController");
const router = require("express").Router();

router.post("/vnpay", Payment.initiateVNPayPayment);
router.get("/vnpay/callback", Payment.handleVNPayReturn);

module.exports = router;
