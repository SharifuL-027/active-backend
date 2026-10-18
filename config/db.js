const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // .env theke MONGO_URI niye aschi
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1); // Error hole server stop kore dibe
  }
};

module.exports = connectDB;