const { Router } = require("express");
const authMiddleware = require("../middlewares/auth");

const router = Router();

const authController = require("../controllers/auth");

//create new user
router.post("/register", authController.createUser);

//login user
router.post("/login", authController.loginUser);

//check user is login or not
router.get(
  "/get-current-user",
  authMiddleware,
  authController.checkCurrentUser
);

module.exports = router;
