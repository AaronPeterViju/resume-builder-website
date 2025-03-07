const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Register a new user
router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const user = new User({ username, email, password });
        await user.save();
        res.status(201).send('User registered successfully');
    } catch (error) {
        res.status(400).send('Error registering user: ' + error.message);
    }
});

// Login a user
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.status(200).send('Login successful');
        } else {
            res.status(400).send('Invalid username or password');
        }
    } catch (error) {
        res.status(400).send('Error logging in: ' + error.message);
    }
});

module.exports = router;
