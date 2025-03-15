const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, role } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        // Assign Super Admin only if it's the first user
        const isFirstUser = (await User.countDocuments()) === 0;
        const userRole = isFirstUser ? 'superadmin' : role || 'user';

        // Create and save the new user
        const user = new User({ username, email, password, role: userRole });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Signup Error:", error);
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

// Login a user
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user by username
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(400).json({ error: 'Invalid username or password' });
        }

        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            role: user.role // Send the role in response
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

module.exports = router;
