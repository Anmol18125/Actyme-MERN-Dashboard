// server/routes/seed.js
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const budgetService = require('../services/budgetService');

/**
 * POST /api/seed
 * Seeds a single progress document (for local testing). Optionally accepts body to set values.
 * Body example:
 * { "cycleRevenue": 25000, "userEntries": 12, "taskPoints": 240 }
 */
router.post('/', async (req, res, next) => {
  try {
    const { cycleRevenue, userEntries, taskPoints } = req.body || {};

    const revenue = typeof cycleRevenue === 'number' ? cycleRevenue : Math.floor(Math.random() * 50000) + 10000;
    const entries = typeof userEntries === 'number' ? userEntries : Math.floor(Math.random() * 30) + 1;
    const points = typeof taskPoints === 'number' ? taskPoints : Math.floor(Math.random() * 1000) + 20;

    const budgetCap = budgetService.computeAllowedBudget(revenue);
    const itinerary = budgetService.chooseItineraryWithinBudget(budgetCap);

    // remove old seed docs for simplicity (optional)
    await Progress.deleteMany({});

    const doc = await Progress.create({
      cycleRevenue: revenue,
      userEntries: entries,
      taskPoints: points,
      budgetCap,
      selectedItinerary: itinerary.name
    });

    res.status(201).json({ success: true, data: doc });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
