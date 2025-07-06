const express = require('express');
const router = express.Router()
const userHandler = require('../controllers/userHnadler')

router.get('/', userHandler.userHelth)
module.exports = router;

router.post('/', userHandler.receveDeletdata)
module.exports = router;