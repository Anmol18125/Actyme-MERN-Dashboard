// server/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI || process.env.MONGOURL || '';
    if (!uri) throw new Error('MONGO_URI not defined in environment');

    await mongoose.connect(uri, {
      // options okay to leave defaults; new driver ignores deprecated options
    });

    console.log('✅ MongoDB connected:', mongoose.connection.host);
  } catch (err) {
    console.error('MongoDB connection error:', err.message || err);
    // Do not exit the process here; let the server report the error.
  }
};

module.exports = connectDB;
