const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  subject: { type: String },
  message: { type: String, required: true },
  status: { type: String, default: 'Unread' } // Unread ba Read status
}, { timestamps: true });

module.exports = mongoose.model('Inquiry', inquirySchema);