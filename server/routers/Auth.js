const AuthController = require("../controllers/authController");
const router = require("express").Router();

// Router of employee
router.post("/users/register", AuthController.RegisterUsers);

router.post("/users/login", AuthController.LoginUsers);

// Router of customers
router.post("/register", AuthController.RegisterCustomers);

router.post("/login", AuthController.LoginCustomers);

module.exports = router;
