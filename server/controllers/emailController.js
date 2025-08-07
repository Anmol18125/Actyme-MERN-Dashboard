// server/controllers/emailController.js

import UnsubscribedEmail from '../models/UnsubscribedEmail.js';

export const unsubscribeEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    const existing = await UnsubscribedEmail.findOne({ email });
    if (existing) {
      return res.status(200).json({ message: 'Already unsubscribed' });
    }

    await UnsubscribedEmail.create({ email });
    res.status(200).json({ message: 'Successfully unsubscribed' });
  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({ message: 'Server error during unsubscribe' });
  }
};
