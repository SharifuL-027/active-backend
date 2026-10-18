// routes/productRoutes.js
const express = require('express');
const { getProducts, createProduct, getSingleProduct } = require('../controllers/productController');

const router = express.Router();

// GET request asle getProducts cholbe, POST asle createProduct cholbe
router.route('/')
  .get(getProducts)
  .post(createProduct);
router.route('/:id').get(getSingleProduct);
module.exports = router;