const middlewareControlle = require('../controllers/middlewareController');
const Customers = require('../controllers/Service/customersController');
const router = require('express').Router();
router.put(
  '/edit_infor/:id',
  middlewareControlle.verifyToken,
  Customers.UpdateInfor
);
router.put(
  '/register_partner',
  middlewareControlle.verifyToken,
  Customers.RegisterPartner
);
module.exports = router;
