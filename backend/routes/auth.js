const express = require('express');
//const bcrypt = require('bcryptjs');
const router = express.Router();
const User = require('../models/User');

// Register a new user (allows admin registration)
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).json({
                message: 'Login successful',
                userId: user._id,
                isAdmin: user.isAdmin // Ensure this is sent correctly
            });
        } else {
            res.status(400).send('Invalid username or password');
        }
    } catch (error) {
        res.status(400).send('Error logging in: ' + error.message);
    }
});


module.exports = router;
