const Progress = require('../models/Progress');

/**
 * Computes the allowed budget for the cycle
 * @param {number} cycleRevenue
 * @returns {number} budgetCap
 */
function computeAllowedBudget(cycleRevenue) {
  return Math.min(cycleRevenue * 0.33, 10000);
}

/**
 * Picks an itinerary name and object based on budgetCap
 * @param {number} budgetCap
 * @returns {{ name: string }}
 */
function chooseItineraryWithinBudget(budgetCap) {
  if (budgetCap >= 8000) {
    return { name: 'Premium Bali Retreat' };
  }
  return { name: 'Local Adventure Pack' };
}

/**
 * Gets the latest progress document and computes derived fields
 */
async function getProgressData() {
  const latest = await Progress.findOne().sort({ createdAt: -1 });

  if (!latest) throw new Error('No progress data found.');

  const { cycleRevenue, userEntries, taskPoints } = latest;
  const budgetCap = computeAllowedBudget(cycleRevenue);
  const itinerary = chooseItineraryWithinBudget(budgetCap);

  return {
    cycleRevenue,
    budgetCap,
    userEntries,
    taskPoints,
    selectedItinerary: itinerary.name,
  };
}

module.exports = {
  computeAllowedBudget,
  chooseItineraryWithinBudget,
  getProgressData,
};
