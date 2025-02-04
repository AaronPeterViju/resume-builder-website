const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true,
        unique: true
    },
    atsScore: {
        type: Number,
        required: true
    },
    suggestions: {
        type: [String],
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Resume', ResumeSchema);