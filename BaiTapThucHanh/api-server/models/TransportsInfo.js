const mongoose = require('mongoose');

const transportSchema = new mongoose.Schema({
  bookingId: {
	type: String,
	required: false
  },
  type: {
	type: String,
	required: true
  },
  transportDate: {
    type: Date,
    required: true
  },
  phoneNumber: {
    type: String,
    required: true
  },
  pickupLocation: {
    type: String,
    required: true
  },
  dropoffLocation: {
    type: String,
    required: true
  },
  numberOfGuest: {
	type: Number,
	required: false
  },
  status: {
    type: String,
    enum: ['0', '1', '2', '3', '4'], // 0: Chưa lấy hàng, 1: Đã lấy hàng, 2: Đã trả hàng, 3: Đã hủy, 4: Đã chuyển nhượng
    default: '0',
    required: true
  },
  note : {
	type: String,
	required: false
  },
  amount: {
    type: Number,
	default: 0,
    required: true
  },
  pickupTime: {
    type: Date,
  },
  dropoffTime: {
    type: Date,
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
    required: false
  }
});

const Transport = mongoose.model('transport', transportSchema, 'transport_info');

module.exports = Transport;
