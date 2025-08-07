// routes/unsubscribe.js
const express = require('express');
const router = express.Router();
const UnsubscribedEmail = require('../models/UnsubscribedEmail');

// GET /api/unsubscribe?email=someone@example.com
router.get('/', async (req, res) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ success: false, error: 'Email is required' });
    }

    const alreadyUnsubscribed = await UnsubscribedEmail.findOne({ email });
    if (alreadyUnsubscribed) {
      return res.status(200).json({ success: true, message: 'Email already unsubscribed' });
    }

    const newEntry = new UnsubscribedEmail({ email });
    await newEntry.save();

    res.status(200).json({ success: true, message: 'Email unsubscribed successfully' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ success: false, error: 'Internal server error' });
  }
});

module.exports = router;
