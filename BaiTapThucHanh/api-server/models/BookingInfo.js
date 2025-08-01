const mongoose = require('mongoose');
const moment = require('moment-timezone');

const driverSchema = new mongoose.Schema({
      type: {
		type: String,
		required: true
	  },
	  date: {
		type: Date,
		required: false
	  },
	  numberOfGuest: {
		type: Number,
		required: true
	  },
	  pickupFrom: {
		type: String,
		required: false
	  },
	  destination: {
		type: String,
		required: false
	  },
	  phoneNumber: {
		type: String,
		required: true
	  },
	  note: {
		type: String,
		required: false
	  },
	  status: {
		type: String,
		default: '0',
		num: ['0', '1', '2', '3'], // 0: pending, 1: called but not successful, 2: confirmed, 3: cancelled
		required: true
	  },
	  confirmNote: {
		type: String,
		required: false
	  },
	  insertTime: {
		type: Date,
		default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
		required: true
	  },
	  updateBy: {
		type: String,
		required: false
	  },
	  updateTime: {
		type: Date,
		default: () => new Date(Date.now() + 7 * 60 * 60 * 1000),
		required: true
	  }
});

const Driver = mongoose.model('booking', driverSchema, 'booking_info');

module.exports = Driver;