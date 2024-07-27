const middlewareControlle = require("../controllers/middlewareController");
const Payment = require("../controllers/paymentController");
const router = require("express").Router();
router.get(
  "/vnpay_return",
  middlewareControlle.verifyToken,
  Payment.handleVNPayReturn
);

module.exports = router;
