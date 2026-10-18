// routes/authRoutes.js
const express = require('express');
const { login, registerAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', registerAdmin);
module.exports = router;