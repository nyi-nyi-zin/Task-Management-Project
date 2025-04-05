const { Router } = require("express");

const router = Router();

const authController = require("../controllers/auth");

//create new user
router.post("/register", authController.createUser);

//login user
router.post("/login", authController.loginUser);

module.exports = router;
