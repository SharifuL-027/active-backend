// controllers/productController.js
const Product = require('../models/Product');

// @desc    Get all products (ba category wise filter)
// @route   GET /api/products
exports.getProducts = async (req, res) => {
  try {
    // URL e jodi kono category thake (jemon: /api/products?category=Spare Parts), tahole filter korbe
    const query = req.query.category ? { category: req.query.category } : {};
    
    const products = await Product.find(query);
    
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Create new product (Postman diye test korar jonno)
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    res.status(201).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(400).json({ success: false, message: 'Invalid Data', error: error.message });
  }
};
// @desc    Get single product by ID
// @route   GET /api/products/:id
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};