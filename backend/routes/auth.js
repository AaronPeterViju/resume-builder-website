const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password, securityQuestion, securityAnswer } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already taken" });
        }

        // Create and save the new user
        const user = new User({ 
            username, 
            email, 
            password, 
            role: 'user',
            securityQuestion,
            securityAnswer
        });
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
        const { usernameOrEmail, password } = req.body;

        // Find user by username or email
        const user = await User.findOne({
            $or: [
                { username: usernameOrEmail },
                { email: usernameOrEmail }
            ]
        });

        if (!user) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        // Check if the password matches
        if (user.password !== password) {
            return res.status(400).json({ error: 'Invalid credentials' });
        }

        res.status(200).json({
            message: 'Login successful',
            userId: user._id,
            username: user.username,
            role: user.role // Send the role in response
        });

    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

// Get security question for a user
router.get('/security-question/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Find user by username
        const user = await User.findOne({ username });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Return the security question
        res.status(200).json({ 
            securityQuestion: user.securityQuestion || 'No security question set'
        });
        
    } catch (error) {
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

// Reset password with security answer
router.post('/reset-password', async (req, res) => {
    try {
        const { identifier, securityAnswer, newPassword } = req.body;
        
        if (!identifier || !securityAnswer || !newPassword) {
            return res.status(400).json({ error: 'All fields are required' });
        }
        
        // Find user by either username or email
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier.toLowerCase() } // Case-insensitive email comparison
            ]
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        // Check if security answer matches (case-insensitive)
        if (user.securityAnswer.toLowerCase() !== securityAnswer.toLowerCase()) {
            return res.status(400).json({ error: 'Incorrect security answer' });
        }
        
        // Update password
        user.password = newPassword;
        await user.save();
        
        res.status(200).json({ message: 'Password reset successful' });
        
    } catch (error) {
        console.error('Password reset error:', error);
        res.status(500).json({ error: "Server error: " + error.message });
    }
});

// Get security question by identifier
router.post('/security-question', async (req, res) => {
    try {
        const { identifier } = req.body;
        
        // Find user by either username or email
        const user = await User.findOne({
            $or: [
                { username: identifier },
                { email: identifier.toLowerCase() } // Convert email to lowercase for case-insensitive comparison
            ]
        });
        
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        
        res.status(200).json({ securityQuestion: user.securityQuestion });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
