// models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Product title is required'],
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Product category is required'],
    enum: ['Traction Machines', 'Elevator Cabins', 'Spare Parts', 'Control Systems', 'Safety Components'] 
  },
  image: {
    type: String, // Cloudinary ba onno kono image URL thakbe
    required: [true, 'Product image URL is required']
  },
  specs: {
    type: String, // Jemon: "Gearless | 5-Year Warranty"
    required: true
  },
  description: {
    type: String,
  },
  isAvailable: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }); // timestamps true dile kokhon toiri kora hoyeche tar exact time save hobe

module.exports = mongoose.model('Product', productSchema);