const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' }, // Default role is 'user'
    securityQuestion: { type: String, default: '' },
    securityAnswer: { type: String, default: '' }
});

const User = mongoose.model('User', UserSchema);
module.exports = User;
