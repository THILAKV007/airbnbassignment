const express = require('express')
const router = express.Router()
const ownersController = require('../controllers/ownersController')
const authMiddleware = require('../middlewares/userAuthMiddelware')

router.post('/', authMiddleware, ownersController.createOwner)
router.get('/', authMiddleware, ownersController.getOwners)
router.get('/:id', authMiddleware, ownersController.getOwnerById)

module.exports = router
