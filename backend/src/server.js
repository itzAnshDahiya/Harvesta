const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

// Middleware
app.use(helmet()); 
app.use(cors({ origin: process.env.CORS_ORIGIN || '*' })); 
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/weather', weatherRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Harvesta server running on port ${PORT} in ${process.env.NODE_ENV || 'development'} mode.`);
});
