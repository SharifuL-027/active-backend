const express = require('express');
const cors = require('cors');
require('dotenv').config(); // Sobcheye upore dotenv thakte hobe

const connectDB = require('./config/db'); // Database connection import

const app = express();


connectDB();


app.use(express.json()); 

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
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/inquiries', require('./routes/inquiryRoutes'));
// Dynamic Port setup
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});