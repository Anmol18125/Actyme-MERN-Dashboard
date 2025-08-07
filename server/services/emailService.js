const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail({ to, subject, templateName, lang, variables }) {
  const html = `
    <h2>Your Expense Report</h2>
    <ul>
      ${variables.expenses.map(exp => `
        <li>
          Amount: ₹${exp.amount} <br>
          Category: ${exp.category} <br>
          Date: ${exp.date} <br>
          Payment Method: ${exp.payment_method} <br>
          Notes: ${exp.notes}
        </li><br>
      `).join('')}
    </ul>
    <p><a href="${variables.unsubscribeLink}">Unsubscribe</a></p>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  });
}

module.exports = sendEmail;
