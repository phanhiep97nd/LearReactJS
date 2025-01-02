// filepath: /e:/LearnReactJS/GitCaNhan/LearReactJS/BaiTapThucHanh/api-server/models/CarInfo.js
const mongoose = require('mongoose');

const carInfoSchema = new mongoose.Schema({
  Type: String,
  Name: String,
  DriverName: String,
  PhoneNumber: String,
  SeatInfo: String,
  Info1: String,
  Info2: String,
  Info3: String,
  ImageName: String,
  FacebookName: String,
  FacebookLink: String,
  ZaloName: String,
  BankNumber: String,
  BankName: String,
  ImageQRBank: String
});

module.exports = mongoose.model('CarInfo', carInfoSchema, 'driver_info');