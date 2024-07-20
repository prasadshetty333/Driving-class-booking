const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');

// POST /api/bookings
router.post('/', bookingController.createBooking);
router.get('/', bookingController.getBookingByUserId);

module.exports = router;
