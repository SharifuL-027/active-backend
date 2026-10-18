// controllers/authController.js
const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');

// JWT Token Generate korar function
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// @desc    Admin Login
// @route   POST /api/auth/login
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if admin exists
    const admin = await Admin.findOne({ email });

    // Admin thakle ebong password match korle token dibe
    if (admin && (await admin.matchPassword(password))) {
      res.status(200).json({
        success: true,
        data: {
          _id: admin._id,
          email: admin.email,
          token: generateToken(admin._id)
        }
      });
    } else {
      res.status(401).json({ success: false, message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error', error: error.message });
  }
};

// @desc    Register First Admin (Eta temporary, sudhu apnar account toiri korar jonno)
// @route   POST /api/auth/register
exports.registerAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const adminExists = await Admin.findOne({ email });
    if (adminExists) {
      return res.status(400).json({ success: false, message: 'Admin already exists' });
    }

    const admin = await Admin.create({ email, password });
    res.status(201).json({
      success: true,
      message: 'Admin created successfully',
      data: {
        _id: admin._id,
        email: admin.email,
        token: generateToken(admin._id)
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};