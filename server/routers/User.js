const UserController = require("../controllers/usersController");
const middlewareControlle = require("../controllers/middlewareController");
const router = require("express").Router();

router.put(
  "/edit/:id",
  middlewareControlle.verifyToken,
  UserController.EditProfileUser
);

module.exports = router;
