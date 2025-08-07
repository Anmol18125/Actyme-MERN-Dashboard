const { getProgressData } = require('../services/budgetServices');

const getProgress = async (req, res) => {
  try {
    const data = await getProgressData();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getProgress,
};
