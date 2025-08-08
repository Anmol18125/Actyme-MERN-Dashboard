// server/services/budgetService.js

const PRE_APPROVED_ITINERARIES = [
  { id: 'itn-1', name: 'City Experience', cost: 2000 },
  { id: 'itn-2', name: 'Weekend Retreat', cost: 5000 },
  { id: 'itn-3', name: 'Island Getaway', cost: 10000 },
  { id: 'itn-4', name: 'Luxury Escape', cost: 15000 }
];

function computeAllowedBudget(cycleRevenue) {
  const allowed = Math.min(Number(cycleRevenue) * 0.33, 10000);
  return Math.round(allowed * 100) / 100; // 2 decimals
}

function chooseItineraryWithinBudget(allowedBudget) {
  const found = PRE_APPROVED_ITINERARIES.find(it => it.cost <= allowedBudget);
  if (found) return found;
  return { id: 'fallback', name: 'Fallback Itinerary', cost: 0 };
}

module.exports = {
  computeAllowedBudget,
  chooseItineraryWithinBudget,
  PRE_APPROVED_ITINERARIES
};
