const express = require('express')
const { addType, addStatus, getAllTypes, getAllStatuses } = require('../controllers/fieldContollers')
const { jwtValidation } = require('../utils/jwtValidation')
const router = express.Router()

router.use(jwtValidation)
router.route('/field/addType').post(addType)
router.route('/field/addStatus').post(addStatus)
router.route('/field/getallTypes').post(getAllTypes)
router.route('/field/getAllStatuses').post(getAllStatuses)


module.exports = router