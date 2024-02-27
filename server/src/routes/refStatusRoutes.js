const express = require('express')
const refStatusController = require('../controllers/refStatusController')

const router = express.Router()

router.get('/ref-status', refStatusController.getAllStatus)
router.get('/ref-status/:id', refStatusController.getStatus)

module.exports = router