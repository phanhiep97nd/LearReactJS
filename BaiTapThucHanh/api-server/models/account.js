const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
	  userName: {
		type: String,
		required: true
	  },
	  hashcode: {
		type: String,
		required: true
	  }
});

const Driver = mongoose.model('Account', accountSchema, 'account');

module.exports = Driver;