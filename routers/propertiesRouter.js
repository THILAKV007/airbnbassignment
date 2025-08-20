const express = require('express')
const router = express.Router()
const propertiesController = require('../controllers/propertiesController')
const authMiddleware = require('../middlewares/userAuthMiddelware')

router.post('/', authMiddleware, propertiesController.createProperty)
router.get('/', authMiddleware, propertiesController.getProperties)
router.get('/:id', authMiddleware, propertiesController.getPropertyById)

module.exports = router
