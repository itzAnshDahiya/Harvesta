const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const weatherRoutes = require('./routes/weatherRoutes');

const app = express();

const allowedOrigins = (process.env.CORS_ORIGIN || '')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

// Always allow common local Vite ports in development to avoid auth breaks when 5173 is occupied.
if ((process.env.NODE_ENV || 'development') === 'development') {
  ['http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174']
    .forEach((origin) => {
      if (!allowedOrigins.includes(origin)) {
        allowedOrigins.push(origin);
      }
    });
}

// Middleware
app.use(helmet()); 
app.use(cors({
  origin: (origin, callback) => {
    const isLocalDevOrigin = !!origin && /^https?:\/\/(localhost|127\.0\.0\.1):(\d{2,5})$/.test(origin);

    if (!origin || isLocalDevOrigin || allowedOrigins.length === 0 || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked for origin: ${origin}`));
  }
})); 
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
