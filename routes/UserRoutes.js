const express = require('express')
const { register,otpSender, login } = require('../controllers/userController')
const router = express.Router()

router.route('/user/otp').post(otpSender)
router.route('/user/register').post(register)
router.route('/user/login').post(login)


module.exports = router