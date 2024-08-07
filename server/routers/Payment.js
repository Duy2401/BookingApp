const middlewareControlle = require('../controllers/middlewareController');
const paymentController = require('../controllers/paymentController');
const router = require('express').Router();

router.post('/momo-payment', paymentController.createBooking);
router.get('/vnpay_return', paymentController.returnBooking);
router.get('/revenue/:id', paymentController.getAllPayment);
module.exports = router;
