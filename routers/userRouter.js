const express = require('express');
const router = express.Router();
const auth = require("../middlewares/userAuthMiddelware");
const { createUsers, loginUser, loggedUser } = require('../controllers/usersController');

router.post('/create-user',createUsers);
router.post('/login', loginUser);
router.get('/logged-user',auth, loggedUser);

module.exports = router;