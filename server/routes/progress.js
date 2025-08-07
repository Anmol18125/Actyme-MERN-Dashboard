const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

// GET latest progress entry
router.get('/', async (req, res) => {
  try {
    const latest = await Progress.findOne().sort({ createdAt: -1 });
    if (!latest) {
      return res.status(404).json({ message: 'No progress data found.' });
    }
    res.status(200).json(latest);
  } catch (err) {
    console.error('Error fetching progress:', err);
    res.status(500).json({ message: 'Server error.' });
  }
});

module.exports = router;
