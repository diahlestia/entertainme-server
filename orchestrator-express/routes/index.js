const router = require('express').Router()
const EntertainmeController = require('../controllers/entertainmeController')

router.get('/entertainme', EntertainmeController.findAll)

module.exports = router