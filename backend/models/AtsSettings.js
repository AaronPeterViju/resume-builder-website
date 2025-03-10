const mongoose = require('mongoose');

const AtsSettingsSchema = new mongoose.Schema({
    intensity: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
        default: 50
    },
    keywords: {
        type: [String],
        default: []
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

AtsSettingsSchema.statics.getSingleton = async function() {
    let settings = await this.findOne();
    
    if (!settings) {
        settings = await this.create({ intensity: 50, keywords: [] });
    }
    
    return settings;
};

module.exports = mongoose.model('AtsSettings', AtsSettingsSchema);