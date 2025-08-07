const mongoose = require('mongoose');

const ProgressSchema = new mongoose.Schema({
  cycleRevenue: Number,
  userEntries: Number,
  taskPoints: Number,
  budgetCap: Number,
  selectedItinerary: String,
}, { timestamps: true });

// ✅ Prevent OverwriteModelError:
module.exports = mongoose.models.Progress || mongoose.model('Progress', ProgressSchema);
