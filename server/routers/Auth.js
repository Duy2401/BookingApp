const AuthController = require("../controllers/authController");
const router = require("express").Router();

// Router of employee
router.post("/users/register", AuthController.RegisterUsers);

router.post("/users/login", AuthController.LoginUsers);

// Router of customers
router.post("/register", AuthController.RegisterCustomers);

router.post("/login", AuthController.LoginCustomers);

// Request refreshToken
router.post("/refresh", AuthController.RequestRefreshToken);

// Router of Logout
router.post("/logout", AuthController.Logout);
module.exports = router;
