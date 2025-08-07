// routes/email.js
const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const dotenv = require('dotenv');
const UnsubscribedEmail = require('../models/UnsubscribedEmail'); // <-- import model

dotenv.config();

const DEFAULT_RECIPIENT = process.env.DEFAULT_EMAIL_RECIPIENT;

router.post('/', async (req, res) => {
  try {
    const { recipient, subject, expenses } = req.body;

    const to = recipient || DEFAULT_RECIPIENT;

    if (!to) {
      return res.status(400).json({ error: 'No recipient provided' });
    }

    // Check if the email is unsubscribed
    const unsubscribed = await UnsubscribedEmail.findOne({ email: to });
    if (unsubscribed) {
      return res.status(403).json({ success: false, error: 'Email is unsubscribed' });
    }

    const htmlTable = `
      <h2>Your Expense Summary</h2>
      <table border="1" cellpadding="8" cellspacing="0">
        <thead>
          <tr>
            <th>Category</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          ${expenses
            .map(
              (e) =>
                `<tr><td>${e.title}</td><td>$${parseFloat(e.amount).toFixed(2)}</td></tr>`
            )
            .join('')}
        </tbody>
      </table>
      <p style="font-size:0.9em; color:#666;">
        If you no longer want to receive these emails, you can 
        <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/unsubscribe?email=${encodeURIComponent(to)}">
          unsubscribe here
        </a>.
      </p>
    `;

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Actyme" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: htmlTable,
    });

    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Email error:', error);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

module.exports = router;
