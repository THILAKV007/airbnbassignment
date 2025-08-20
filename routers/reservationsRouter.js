const express = require('express')
const router = express.Router()
const reservationsController = require('../controllers/reservationsController')
const authMiddleware = require('../middlewares/userAuthMiddelware')

router.post('/', authMiddleware, reservationsController.createReservation)
router.get('/', authMiddleware, reservationsController.getReservations)
router.get('/:id', authMiddleware, reservationsController.getReservationById)

module.exports = router
