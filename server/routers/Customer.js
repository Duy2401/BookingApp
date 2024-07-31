const middlewareControlle = require("../controllers/middlewareController");
const Customers = require("../controllers/Service/customersController");
const router = require("express").Router();
router.put(
  "/edit_infor/:id",
  middlewareControlle.verifyToken,
  Customers.UpdateInfor
);
router.post(
  "/register_partner",
  middlewareControlle.verifyCustomer,
  Customers.RegisterPartner
);
module.exports = router;
