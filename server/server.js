// server/server.js
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware: CORS (allow local dev + Vercel domain if provided)
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://actyme-mern-dashboard.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // allow curl/postman/no-origin requests
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(new Error('CORS policy: This origin is not allowed.'));
  },
  credentials: true,
}));

app.use(express.json());

// Routes
app.use('/api/progress', require('./routes/progress'));
app.use('/api/seed', require('./routes/seed'));
app.use('/api/email', require('./routes/email'));
app.use('/api/unsubscribe', require('./routes/unsubscribe'));

// Serve client build if present (optional single-deploy approach)
if (process.env.SERVE_CLIENT === 'true') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// Error handler (last middleware)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err && err.message ? err.message : err);
  res.status(500).json({ success: false, error: err && err.message ? err.message : 'Server error' });
});

// Start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
