// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

const protect = async (req, res, next) => {
  let token;

  // Header e jodi 'Authorization' thake ebong seta 'Bearer' diye shuru hoy
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Header theke sudhu token er ongsho tuku alada kora
      token = req.headers.authorization.split(' ')[1];

      // Token ti ashol kina ta check (verify) kora
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Token theke paowa ID diye database theke Admin er details niye asha (password chara)
      // Ebong seta ke req.user e set kora jate onnanno route theke use kora jay
      req.admin = await Admin.findById(decoded.id).select('-password');

      next(); // Sob thik thakle porer kaaj e jete deya (next)
    } catch (error) {
      console.error(error);
      res.status(401).json({ success: false, message: 'Not authorized, token failed' });
    }
  }

  // Jodi kono token ei na thake
  if (!token) {
    res.status(401).json({ success: false, message: 'Not authorized, no token' });
  }
};

module.exports = { protect };