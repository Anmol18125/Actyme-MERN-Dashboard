require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const progressRoutes = require('./routes/progress');
const seedRoutes = require('./routes/seed');
const emailRoutes = require('./routes/email');
const unsubscribeRoutes = require('./routes/unsubscribe');

app.use('/api/progress', progressRoutes);
app.use('/api/seed', seedRoutes);
app.use('/api/email', emailRoutes);
app.use('/api/unsubscribe', unsubscribeRoutes); // ✅ support unsubscribe feature

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
