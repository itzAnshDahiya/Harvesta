const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
require('dotenv').config();

const connectDB = require('./db');

// Route Imports
const authRoutes = require('./routes/authRoutes');
const fieldRoutes = require('./routes/fieldRoutes');
const weatherRoutes = require('./routes/weatherRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const marketRoutes = require('./routes/marketRoutes');
const forumRoutes = require('./routes/forumRoutes');
const pestRoutes = require('./routes/pestRoutes');

const app = express();

// Middleware
app.use(helmet());
app.use(cors({
  origin: (origin, callback) => {
    // Allow all local dev origins and configured origins
    if (!origin || /^https?:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin)) {
      return callback(null, true);
    }
    const allowed = (process.env.CORS_ORIGIN || '').split(',').map(o => o.trim()).filter(Boolean);
    if (allowed.includes('*') || allowed.includes(origin)) return callback(null, true);
    return callback(new Error(`CORS blocked: ${origin}`));
  }
}));
app.use(express.json());

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/fields', fieldRoutes);
app.use('/api/v1/weather', weatherRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/market', marketRoutes);
app.use('/api/v1/forum', forumRoutes);
app.use('/api/v1/pest', pestRoutes);

// Health check
app.get('/api/v1/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Server Error', error: err.message });
});

// Connect DB and Start Server
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🌿 Harvesta server running on port ${PORT}`);
  });
});
