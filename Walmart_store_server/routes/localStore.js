const express = require('express');
const router = express.Router();
const homeController = require('../controllers/localStoreController');

// Basic routes this route connect my QR code future
router.get('/', homeController.getHello);




module.exports = router;