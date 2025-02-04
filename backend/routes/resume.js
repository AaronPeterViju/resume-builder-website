const express = require('express');
const multer = require('multer');
const pdfParse = require('pdf-parse');
const docxParser = require('docx-parser');
const Resume = require('../models/Resume');
const { analyzeResume, generateHash } = require('../utils/resumeAnalyzer');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.post('/upload', upload.single('resume'), async (req, res) => {
    try {
        const file = req.file;
        let content = '';

        if (file.mimetype === 'application/pdf') {
            const data = await pdfParse(file.buffer);
            content = data.text;
        } else if (file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            content = await docxParser.parseBuffer(file.buffer);
        } else {
            return res.status(400).send('Unsupported file format');
        }

        const hash = generateHash(content);

        let resume = await Resume.findOne({ hash: hash });
        if (resume) {
            return res.status(200).json({ atsScore: resume.atsScore, suggestions: resume.suggestions });
        }

        const { atsScore, suggestions } = analyzeResume(content);

        resume = new Resume({
            filename: file.originalname,
            content: content,
            hash: hash,
            atsScore: atsScore,
            suggestions: suggestions
        });

        await resume.save();

        res.status(200).json({ atsScore, suggestions });
    } catch (error) {
        console.error('Error processing resume:', error);
        res.status(500).send('Error processing resume: ' + error.message);
    }
});

module.exports = router;