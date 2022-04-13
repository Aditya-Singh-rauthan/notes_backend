const express = require("express");
const { getAllUsers } = require("../controllers/adminControllers");
const { otpSender } = require("../controllers/userController");
const { jwtValidation } = require("../utils/jwtValidation");
const router = express.Router();

router.route("/admin/users").post( jwtValidation,getAllUsers);

module.exports = router;
