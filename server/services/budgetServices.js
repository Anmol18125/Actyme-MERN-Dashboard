const Progress = require('../models/Progress');

function calculateAllowedBudget(cycleRevenue) {
  return Math.min(cycleRevenue * 0.33, 10000);
}

async function getProgressData() {
  const latest = await Progress.findOne().sort({ createdAt: -1 });

  if (!latest) throw new Error('No progress data found.');

  const { cycleRevenue, userEntries, taskPoints } = latest;
  const budgetCap = calculateAllowedBudget(cycleRevenue);

  const selectedItinerary =
    budgetCap >= 8000 ? 'Premium Bali Retreat' : 'Local Adventure Pack';

  return {
    cycleRevenue,
    budgetCap,
    userEntries,
    taskPoints,
    selectedItinerary,
  };
}

module.exports = {
  calculateAllowedBudget,
  getProgressData,
};
