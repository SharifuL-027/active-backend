const Inquiry = require('../models/Inquiry');

// কাস্টমার যখন ফর্ম সাবমিট করবে (Public)
exports.createInquiry = async (req, res) => {
  try {
    const inquiry = await Inquiry.create(req.body);
    res.status(201).json({ success: true, data: inquiry });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// অ্যাডমিন যখন সব মেসেজ দেখবে (Protected)
exports.getInquiries = async (req, res) => {
  try {
    const inquiries = await Inquiry.find().sort({ createdAt: -1 }); // নতুন মেসেজ আগে দেখাবে
    res.status(200).json({ success: true, data: inquiries });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};

// মেসেজ ডিলিট করার জন্য (Protected)
exports.deleteInquiry = async (req, res) => {
  try {
    await Inquiry.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server Error' });
  }
};