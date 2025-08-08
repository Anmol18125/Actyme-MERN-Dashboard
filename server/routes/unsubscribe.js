// server/routes/unsubscribe.js
const express = require('express');
const router = express.Router();
const UnsubscribedEmail = require('../models/UnsubscribedEmail');

/**
 * POST /api/unsubscribe
 * Body: { "email": "user@example.com" }
 */
router.post('/', async (req, res, next) => {
  try {
    const { email } = req.body || {};
    if (!email) return res.status(400).json({ success: false, error: 'email required' });

    const existing = await UnsubscribedEmail.findOne({ email });
    if (existing) return res.json({ success: true, message: 'Already unsubscribed' });

    await UnsubscribedEmail.create({ email });
    return res.json({ success: true, message: 'Unsubscribed' });
  } catch (err) {
    next(err);
  }
});

/**
 * GET /api/unsubscribe?email=...
 * Link-friendly unsubscribe
 */
router.get('/', async (req, res, next) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).send('Email is required');

    const existing = await UnsubscribedEmail.findOne({ email });
    if (existing) {
      return res.send('This email is already unsubscribed.');
    }

    await UnsubscribedEmail.create({ email });
    // simple HTML response for link click
    res.send(`<html><body><h3>${email} has been unsubscribed.</h3><p>You will no longer receive emails.</p></body></html>`);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
