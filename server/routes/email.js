// server/routes/email.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const UnsubscribedEmail = require('../models/UnsubscribedEmail');

const DEFAULT_RECIPIENT = process.env.DEFAULT_EMAIL_RECIPIENT || process.env.EMAIL_USER;

/**
 * POST /api/email
 * Body:
 * {
 *   "recipient": "user@example.com" OR ["a@x.com","b@y.com"],
 *   "subject": "Report",
 *   "expenses": [{ "title": "Hotel", "amount": 400 }, ...]
 * }
 */
router.post('/', async (req, res, next) => {
  try {
    const { recipient, subject, expenses } = req.body || {};

    if (!expenses || !Array.isArray(expenses) || expenses.length === 0) {
      return res.status(400).json({ success: false, error: 'expenses array required' });
    }

    // Decide recipient(s)
    const to = recipient && recipient.length ? recipient : DEFAULT_RECIPIENT;
    const recipients = Array.isArray(to) ? to : [to];

    // Check unsubscribed
    const unsubscribed = await UnsubscribedEmail.find({ email: { $in: recipients } });
    if (unsubscribed && unsubscribed.length) {
      const blocked = unsubscribed.map(u => u.email);
      return res.status(403).json({ success: false, error: 'One or more recipients unsubscribed', blocked });
    }

    // Build HTML table
    const total = expenses.reduce((s, e) => s + Number(e.amount || 0), 0);
    const rows = expenses.map(e => `
      <tr>
        <td style="padding:8px;border:1px solid #ddd">${e.title || 'Item'}</td>
        <td style="padding:8px;border:1px solid #ddd;text-align:right">$${Number(e.amount || 0).toFixed(2)}</td>
      </tr>
    `).join('');

    const html = `
      <div style="font-family:Arial,Helvetica,sans-serif;color:#111">
        <h3>Expense Summary</h3>
        <table style="border-collapse:collapse;width:100%">${rows}
          <tr>
            <td style="padding:8px;border:1px solid #ddd;font-weight:bold">Total</td>
            <td style="padding:8px;border:1px solid #ddd;text-align:right;font-weight:bold">$${total.toFixed(2)}</td>
          </tr>
        </table>
        <p style="font-size:12px;color:#666">
          To unsubscribe from these emails, click <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/unsubscribe?email=${encodeURIComponent(recipients[0])}">unsubscribe</a>.
        </p>
      </div>
    `;

    const text = expenses.map(e => `- ${e.title || 'Item'}: $${Number(e.amount || 0).toFixed(2)}`).join('\n') + `\n\nTotal: $${total.toFixed(2)}`;

    // Transporter
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const info = await transporter.sendMail({
      from: `"Actyme" <${process.env.EMAIL_USER}>`,
      to: recipients.join(','),
      subject: subject || 'Actyme Expense Summary',
      text,
      html
    });

    res.json({ success: true, messageId: info.messageId });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
