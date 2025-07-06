// routes/productRoutes.js
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');



// POST /api/products - Create new product
router.post('/', productController.createProduct);

// GET /api/products - Get all products
router.get('/', productController.getAllProducts);

 //router.post('/restore', productController.restoreProduct);

module.exports = router;