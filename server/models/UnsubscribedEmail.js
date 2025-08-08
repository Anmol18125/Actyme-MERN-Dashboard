// server/models/UnsubscribedEmail.js
const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  unsubscribedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.models.UnsubscribedEmail || mongoose.model('UnsubscribedEmail', schema);
