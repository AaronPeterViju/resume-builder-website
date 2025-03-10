const express = require('express');
const router = express.Router();
const AtsSettings = require('../models/AtsSettings');
const Resume = require('../models/Resume');

// Get current ATS settings
router.get('/settings', async (req, res) => {
    try {
        const settings = await AtsSettings.getSingleton();
        res.status(200).json(settings);
    } catch (error) {
        console.error('Error getting ATS settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

// Update ATS settings
router.post('/settings', async (req, res) => {
    try {
        const { intensity, keywords } = req.body;

        // Validate input
        if (intensity < 0 || intensity > 100) {
            return res.status(400).json({ message: 'Intensity must be between 0 and 100' });
        }

        // Update settings
        const settings = await AtsSettings.getSingleton();
        settings.intensity = intensity;
        settings.keywords = keywords || [];
        settings.updatedAt = Date.now();
        await settings.save();

        // Delete all stored resumes
        await Resume.deleteMany({});

        res.status(200).json({ 
            message: 'ATS settings updated successfully',
            settings
        });
    } catch (error) {
        console.error('Error updating ATS settings:', error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;