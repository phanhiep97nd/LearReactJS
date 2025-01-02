const mongoose = require('mongoose');

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
    }
});

const Driver = mongoose.model('Driver', driverSchema);

module.exports = Driver;