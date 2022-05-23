const express = require('express')
const { postdata } = require('../controllers/postdatacontroller')
const { jwtValidation } = require('../utils/jwtValidation')
const router = express.Router()
router.use(jwtValidation)
router.route('/').post(postdata)


module.exports = router