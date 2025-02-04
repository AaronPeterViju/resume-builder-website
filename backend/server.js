const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const resumeRoutes = require('./routes/resume');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(cors());

app.use('/api/auth', authRoutes);
app.use('/api/resume', resumeRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to the Resume Builder API');
});

const mongoURI = 'mongodb://127.0.0.1:27017/resume-builder';

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});