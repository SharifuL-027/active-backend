const express = require('express');
const { createInquiry, getInquiries, deleteInquiry } = require('../controllers/inquiryController');
const { protect } = require('../middleware/authMiddleware'); // Admin validation

const router = express.Router();

router.post('/', createInquiry); // কাস্টমার ফর্ম সাবমিট করবে (No token needed)
router.get('/', protect, getInquiries); // অ্যাডমিন মেসেজ দেখবে (Token needed)
router.delete('/:id', protect, deleteInquiry); // অ্যাডমিন ডিলিট করবে

module.exports = router;