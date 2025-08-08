require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

const app = express();

// =====================
// Connect to MongoDB
// =====================
connectDB();

// =====================
// Middleware
// =====================
const allowedOrigins = [
  'https://actyme-mern-dashboard.vercel.app', // Vercel live site
  'http://localhost:5173' // local dev if using Vite
];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests without origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    } else {
      return callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json());

// =====================
// API Routes
// =====================
const progressRoutes = require('./routes/progress');
const seedRoutes = require('./routes/seed');
const emailRoutes = require('./routes/email');
const unsubscribeRoutes = require('./routes/unsubscribe');

app.use('/api/progress', progressRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/email', emailRoutes); // M9 email feature
app.use('/api/unsubscribe', unsubscribeRoutes); // M9 unsubscribe feature

// =====================
// Serve Frontend (React build)
// =====================
// If you also deploy frontend files from same Render service
if (process.env.NODE_ENV === 'production') {
  const clientBuildPath = path.join(__dirname, '../client/dist');
  app.use(express.static(clientBuildPath));

  app.get('*', (req, res) => {
    res.sendFile(path.join(clientBuildPath, 'index.html'));
  });
}

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
