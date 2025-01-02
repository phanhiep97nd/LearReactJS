const express = require('express');
const BookingInfo = require('../models/BookingInfo');

const router = express.Router();

// Insert a new booking info
router.post('/RegisterBooking', async (req, res) => {
	const bookingInfo = new BookingInfo({
		type: req.body.type,
		date: req.body.date,
		numberOfGuest: req.body.numberOfGuest,
		pickupFrom: req.body.pickupFrom,
		destination: req.body.destination,
		phoneNumber: req.body.phoneNumber,
		note: req.body.note
 	 });

  try {
    const newBookingInfo = await bookingInfo.save();
    res.status(201).json(newBookingInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;