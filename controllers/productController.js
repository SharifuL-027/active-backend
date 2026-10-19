// controllers/productController.js
const Product = require('../models/Product');
const cloudinary = require('cloudinary').v2;

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
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

// controllers/productController.js
// @desc    Create new product with Multiple Image Upload
// @route   POST /api/products
exports.createProduct = async (req, res) => {
  try {
    let imageUrls = [];

    // যদি ইউজার ছবি আপলোড করে থাকে (req.files Array)
    if (req.files && req.files.length > 0) {
      
      // Promise.all ব্যবহার করা হয়েছে যাতে সবগুলো ছবি একসাথে Cloudinary-তে আপলোড হয়
      const uploadPromises = req.files.map(file => {
        const b64 = Buffer.from(file.buffer).toString('base64');
        let dataURI = "data:" + file.mimetype + ";base64," + b64;
        return cloudinary.uploader.upload(dataURI, {
          folder: 'activelifts_products',
        });
      });

      const uploadResponses = await Promise.all(uploadPromises);
      imageUrls = uploadResponses.map(response => response.secure_url);
      
    } else {
      return res.status(400).json({ success: false, message: 'Please upload at least 2 images' });
    }

    const product = await Product.create({
      title: req.body.title,
      category: req.body.category,
      specs: req.body.specs,
      description: req.body.description,
      images: imageUrls // Array টি ডাটাবেসে সেভ হবে
    });

    res.status(201).json({ success: true, data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
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

// @desc    Delete a product
// @route   DELETE /api/products/:id
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }
    res.status(200).json({ success: true, message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Update a product
// @route   PUT /api/products/:id
exports.updateProduct = async (req, res) => {
  try {
    let product = await Product.findById(req.params.id);
    
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    // req.body theke notun data diye product update kora
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // notun update kora data ta return korbe
      runValidators: true
    });

    res.status(200).json({ success: true, message: 'Product updated successfully', data: product });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};