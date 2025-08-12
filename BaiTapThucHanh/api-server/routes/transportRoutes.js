const express = require('express');
const Transport = require('../models/TransportsInfo'); // file schema bạn vừa tạo
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// Insert a new transport record
router.post('/RegisterTransport', async (req, res) => {
  const transport = new Transport({
	type: req.body.type,
	bookingId: req.body.bookingId,
    transportDate: req.body.transportDate,
    phoneNumber: req.body.phoneNumber,
    pickupLocation: req.body.pickupLocation,
    dropoffLocation: req.body.dropoffLocation,
	numberOfGuest: req.body.numberOfGuest || 0,
    status: req.body.status || '0',
    amount: req.body.amount,
	note: req.body.note || '',
	updateBy: req.body.updateBy || 'system',
  });

  try {
    const newTransport = await transport.save();
    res.status(201).json(newTransport);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Search transport records
router.get('/SearchTransport', authMiddleware, async (req, res) => {
  const { id, transportDateFrom, transportDateTo, status, phoneNumber, pickupLocation, dropoffLocation } = req.query;
  let filter = {};

  if (id) {
    filter._id = id;
  }

  if (transportDateFrom && transportDateTo) {
		const from = new Date(`${transportDateFrom}T00:00:00.000Z`);
		const to = new Date(`${transportDateTo}T23:59:59.999Z`);
		filter.transportDate = { $gte: from, $lte: to };
	} else if (transportDateFrom) {
		const from = new Date(`${transportDateFrom}T00:00:00.000Z`);
		filter.transportDate = { $gte: from };
	} else if (transportDateTo) {
		const to = new Date(`${transportDateTo}T23:59:59.999Z`);
		filter.transportDate = { $lte: to };
  }

  if (status) {
    filter.status = status;
  }

  if (phoneNumber) {
    filter.phoneNumber = phoneNumber;
  }

  // Tìm kiếm LIKE %pickupLocation%
  if (pickupLocation) {
    filter.pickupLocation = { $regex: pickupLocation, $options: 'i' };
  }

  // Tìm kiếm LIKE %dropoffLocation%
  if (dropoffLocation) {
    filter.dropoffLocation = { $regex: dropoffLocation, $options: 'i' };
  }

  try {
    const transports = await Transport.find(filter);
    res.json(transports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Update transport record
router.put('/UpdateTransport', authMiddleware, async (req, res) => {
  const {
    id, transportDate, phoneNumber,
    pickupLocation, dropoffLocation, status, note, numberOfGuest,
    amount, pickupTime, dropoffTime, updateBy
  } = req.body;

  try {
    const transport = await Transport.findById(id);
    if (!transport) {
      return res.status(404).json({ message: 'Transport not found' });
    }

    if (transportDate) transport.transportDate = transportDate;
    if (phoneNumber) transport.phoneNumber = phoneNumber;
    if (pickupLocation) transport.pickupLocation = pickupLocation;
    if (dropoffLocation) transport.dropoffLocation = dropoffLocation;
    if (status) transport.status = status;
    if (amount) transport.amount = amount;
    if (pickupTime) transport.pickupTime = pickupTime;
    if (dropoffTime) transport.dropoffTime = dropoffTime;
	if (note) transport.note = note;
	if (numberOfGuest) transport.numberOfGuest = numberOfGuest;

    transport.updateTime = new Date(Date.now() + 7 * 60 * 60 * 1000); // GMT+7
    transport.updateBy = updateBy || 'system';

    const updatedTransport = await transport.save();
    res.json(updatedTransport._id);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
