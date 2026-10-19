const multer = require('multer');

// আমরা ছবিটিকে লোকাল পিসিতে সেভ না করে সরাসরি মেমোরিতে (RAM) রাখবো, 
// যাতে সরাসরি Cloudinary তে পাঠিয়ে দেওয়া যায়।
const storage = multer.memoryStorage();

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 } // Maximum 5MB size limit
});

module.exports = upload;