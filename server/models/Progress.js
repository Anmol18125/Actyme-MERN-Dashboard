// server/models/Progress.js
const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  cycleRevenue: { type: Number, required: true, default: 0 },
  userEntries: { type: Number, required: true, default: 0 },
  taskPoints: { type: Number, required: true, default: 0 },
  budgetCap: { type: Number, default: 0 }, // computed
  selectedItinerary: { type: String, default: '' },
  createdAt: { type: Date, default: Date.now }
});

// Avoid OverwriteModelError in dev/hot reload
module.exports = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
