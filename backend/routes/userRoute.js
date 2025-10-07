const express = require("express");
const authControllers = require("../controllers/authControllers");

router = express.Router();
router.route("/signup").post(authControllers.signup);
router.route("/login").post(authControllers.login);
router.route("/me").get(authControllers.protect, authControllers.myProfile);
module.exports = router;
