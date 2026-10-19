// routes/productRoutes.js
const express = require('express');
const { getProducts, createProduct, getSingleProduct, deleteProduct, updateProduct } = require('../controllers/productController');
// Notun middleware ti import kora holo
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// GET request gulo sobai dekhte parbe, tai protect charai rakhlam
router.get('/', getProducts);
router.get('/:id', getSingleProduct);
router.post('/', protect, upload.array('images', 6), createProduct);
// Kintu POST ba CREATE request sudhu valid admin pathate parbe, tai 'protect' middleware boshiye dilam
router.post('/', protect, createProduct);
router.delete('/:id', protect, deleteProduct);
router.put('/:id', protect, updateProduct);
// Vobisshote delete/update er jnno nicher moto korte parben:
// router.delete('/:id', protect, deleteProduct);
// router.put('/:id', protect, updateProduct);

module.exports = router;