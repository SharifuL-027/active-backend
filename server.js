const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Sobcheye upore dotenv thakte hobe

const connectDB = require('./config/db'); // Database connection import

const app = express();

// Database er sathe connect kora
connectDB();

// Middleware
app.use(express.json()); // JSON parsing er jonno

// CORS Security - Sudhu .env e deya Frontend URL thekei request allow korbe
app.use(cors({
  origin: process.env.CLIENT_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Basic Route Test
app.get('/api', (req, res) => {
  res.status(200).json({ 
    success: true,
    message: 'Active Lifts Engineering API is running',
    environment: process.env.NODE_ENV
  });
});
// Routes
app.use('/api/products', require('./routes/productRoutes'));


// Dynamic Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});