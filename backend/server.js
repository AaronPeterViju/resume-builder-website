const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const User = require('./models/User'); // Import User model
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');
const atsRoutes = require('./routes/ats');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);
app.use('/api/ats', atsRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Resume Builder API');
});

const mongoURI = 'mongodb://127.0.0.1:27017/resume-builder';

mongoose.connect(mongoURI)
  .then(async () => {
    console.log('Connected to MongoDB');

    // Admin Credentials (Stored as plain text)
    const adminUsername = 'admin';
    const adminEmail = 'admin@example.com';
    const adminPassword = 'admin';

    // Check if an admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });

    if (!existingAdmin) {
        const newAdmin = new User({
            username: adminUsername,
            email: adminEmail,
            password: adminPassword, //  stored as plain text
            role: 'admin'
        });

        await newAdmin.save();
        //console.log('Default admin created.');
    } else {
        //console.log('Admin already exists.');
    }
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
