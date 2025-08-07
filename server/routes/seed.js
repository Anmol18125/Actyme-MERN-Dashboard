const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');

const itineraries = [
  'Local Adventure Pack',
  'Premium Bali Retreat',
  'Tech Conference in Berlin',
  'Startup Offsite in Lisbon',
  'Retreat in the Alps'
];

router.post('/', async (req, res) => {
  try {
    // Optional: delete previous entries to avoid clutter
    await Progress.deleteMany({});

    const cycleRevenue = Math.floor(Math.random() * 50000) + 10000; // $10k - $60k
    const budgetCap = Math.min((cycleRevenue * 0.33), 10000).toFixed(2);

    const newEntry = new Progress({
      cycleRevenue,
      userEntries: Math.floor(Math.random() * 20) + 5,
      taskPoints: Math.floor(Math.random() * 500) + 100,
      budgetCap,
      selectedItinerary: itineraries[Math.floor(Math.random() * itineraries.length)],
    });

    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    console.error('Error seeding progress:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
