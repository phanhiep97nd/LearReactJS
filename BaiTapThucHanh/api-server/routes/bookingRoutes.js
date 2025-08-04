const express = require('express');
const BookingInfo = require('../models/BookingInfo');
const authMiddleware = require('../middleware/auth');

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

// Get booking info
router.get('/SearchBooking', authMiddleware, async (req, res) => {
	const { id, insertDateFrom, insertDateTo, status, phoneNumber, date } = req.query;
	let filter = {};

	if (id) {
		filter._id = id;
	}

	if (date) {
		const startOfDay = new Date(date);
		const endOfDay = new Date(date);
		endOfDay.setHours(23, 59, 59, 999);
		filter.date = {
			$gte: startOfDay,
			$lte: endOfDay
		};
	}

	if (insertDateFrom && insertDateTo) {
		const from = new Date(insertDateFrom);
		from.setHours(0, 0, 0, 0);

		const to = new Date(insertDateTo);
		to.setHours(23, 59, 59, 999);

		filter.insertTime = { $gte: from, $lte: to };
	} else if (insertDateFrom) {
		const from = new Date(insertDateFrom);
		from.setHours(0, 0, 0, 0);

		filter.insertTime = { $gte: from };
	} else if (insertDateTo) {
		const to = new Date(insertDateTo);
		to.setHours(23, 59, 59, 999);

		filter.insertTime = { $lte: to };
	}

	if (status) {
		filter.status = status;
	}
	if (phoneNumber) {
		filter.phoneNumber = phoneNumber;
	}

	try {
		const bookings = await BookingInfo.find(filter);
		res.json(bookings);
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
});


// Update booking info
router.put('/UpdateBooking', authMiddleware, async (req, res) => {
	const { id, type, date, numberOfGuest, pickupFrom, destination, phoneNumber, note, status, confirmNote } = req.body;

	try {
		const booking = await BookingInfo.findById(id);
		if (!booking) {
			return res.status(404).json({ message: 'Booking not found' });
		}

		if (type) booking.type = type;
		if (date) booking.date = date;
		if (numberOfGuest) booking.numberOfGuest = numberOfGuest;
		if (pickupFrom) booking.pickupFrom = pickupFrom;
		if (destination) booking.destination = destination;
		if (phoneNumber) booking.phoneNumber = phoneNumber;
		if (note) booking.note = note;
		if (status) booking.status = status;
		if (confirmNote) booking.confirmNote = confirmNote;
		booking.updateTime = new Date(Date.now() + 7 * 60 * 60 * 1000); // Update time in UTC+7
		booking.updateBy = req.body.updateBy || 'system'; // Default to 'system' if not provided

		const updatedBooking = await booking.save();
		res.json(updatedBooking._id);
	} catch (err) {
		res.status(400).json({ message: err.message });
	}
});
module.exports = router;