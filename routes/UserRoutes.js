const express = require('express')
const { register,otpSender, login, getUser, getProfile } = require('../controllers/userController')
const { jwtValidation } = require('../utils/jwtValidation')
const router = express.Router()
router.route('/user/otp').post(otpSender)
router.route('/user/register').post(register)
router.route('/user/login').post(login)
router.route('/user/user').post(getUser)
router.route('/user/profile').post(jwtValidation, getProfile)


module.exports = router