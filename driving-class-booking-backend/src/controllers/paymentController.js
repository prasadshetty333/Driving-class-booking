// controllers/paymentController.js
const Payment = require('../models/Payment');

exports.processPayment = async (req, res) => {
  try {
    const { amount, method, userId } = req.body;

    if (!amount || !method || !userId) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const payment = new Payment({
      amount,
      method,
      userId
    });

    const savedPayment = await payment.save();

    res.status(201).json(savedPayment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};
