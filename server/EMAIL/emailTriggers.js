// server/email/emailTriggers.js
const sendEmail = require('./sendEmail');

async function checkAndSendEmail(progressData) {
  const threshold = 10000;
  if (progressData.cycleRevenue >= threshold) {
    await sendEmail({
      to: 'user@example.com',
      subject: '🎉 Budget Target Reached!',
      templateName: 'budgetTargetReached',
      lang: 'en',
      variables: {
        revenue: progressData.cycleRevenue,
        unsubscribeLink: 'http://localhost:3000/unsubscribe'
      }
    });
  }
}

module.exports = { checkAndSendEmail };
