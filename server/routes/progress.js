// server/routes/progress.js
const express = require('express');
const router = express.Router();
const Progress = require('../models/Progress');
const budgetService = require('../services/budgetService');

/**
 * GET /api/progress
 * Returns the latest progress object with budget calculations and itinerary selection.
 */
router.get('/', async (req, res, next) => {
  try {
    // Get the latest progress doc (seed creates one)
    let progress = await Progress.findOne().sort({ createdAt: -1 }).lean();

    if (!progress) {
      // If none exists, return defaults
      const sampleRevenue = 12000;
      const allowedBudget = budgetService.computeAllowedBudget(sampleRevenue);
      const itinerary = budgetService.chooseItineraryWithinBudget(allowedBudget);

      progress = {
        cycleRevenue: sampleRevenue,
        userEntries: 0,
        taskPoints: 0,
        budgetCap: allowedBudget,
        selectedItinerary: itinerary.name
      };
    } else {
      // ensure budgetCap and selectedItinerary are up-to-date
      const allowedBudget = budgetService.computeAllowedBudget(progress.cycleRevenue);
      const itinerary = budgetService.chooseItineraryWithinBudget(allowedBudget);
      progress.budgetCap = allowedBudget;
      progress.selectedItinerary = itinerary.name;
    }

    res.json(progress);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
