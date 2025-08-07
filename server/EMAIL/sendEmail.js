// server/email/sendEmail.js
const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');

const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER, // your Gmail
    pass: process.env.EMAIL_PASS  // app password
  }
});

async function sendEmail({ to, subject, templateName, lang = 'en', variables = {} }) {
  const templatePath = path.join(__dirname, 'templates', `${templateName}.${lang}.html`);
  let html = fs.readFileSync(templatePath, 'utf-8');

  // Replace {{placeholders}} in template
  Object.entries(variables).forEach(([key, value]) => {
    html = html.replace(new RegExp(`{{${key}}}`, 'g'), value);
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html
  };

  return transporter.sendMail(mailOptions);
}

module.exports = sendEmail;
