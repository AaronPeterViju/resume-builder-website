const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Middleware to verify Super Admin
const verifySuperAdmin = (req, res, next) => {
  const superAdminId = req.headers.authorization;
  if (!superAdminId) {
    return res.status(403).json({ error: 'Unauthorized: No token provided' });
  }
  next();
};

// ✅ Get All Users (Except Super Admin)
router.get('/get-all-users', verifySuperAdmin, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: 'superadmin' } }, 'username email role');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Server Error' });
  }
});

// ✅ Make Admin API
router.put('/:userId/make-admin', verifySuperAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { role: 'admin' }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error updating role' });
  }
});

// ✅ Remove Admin API
router.put('/:userId/remove-admin', verifySuperAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.userId, { role: 'user' }, { new: true });
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Error removing admin role' });
  }
});

module.exports = router;
