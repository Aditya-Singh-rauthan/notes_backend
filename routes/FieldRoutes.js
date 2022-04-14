const express = require('express')
const { addType, addStatus, getAllTypes, getAllStatuses } = require('../controllers/fieldContollers')
const { jwtValidation } = require('../utils/jwtValidation')
const router = express.Router()

router.route('/field/addType').post(jwtValidation,addType)
router.route('/field/addStatus').post(jwtValidation,addStatus)
router.route('/field/getallTypes').post(jwtValidation,getAllTypes)
router.route('/field/getAllStatuses').post(jwtValidation,getAllStatuses)


module.exports = router