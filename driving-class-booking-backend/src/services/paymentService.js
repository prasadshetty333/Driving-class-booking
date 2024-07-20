// services/paymentService.js
const Payment = require('../models/Payment');

exports.createPayment = async (paymentData) => {
  const payment = new Payment(paymentData);
  return await payment.save();
};
