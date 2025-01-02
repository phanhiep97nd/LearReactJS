// filepath: /e:/LearnReactJS/GitCaNhan/LearReactJS/BaiTapThucHanh/api-server/routes/itemRoutes.js
const express = require('express');
const CarInfo = require('../models/CarInfo');

const router = express.Router();

// Get all car info
router.get('/', async (req, res) => {
  try {
    const carInfos = await CarInfo.find();
    res.json(carInfos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create a new car info
router.post('/', async (req, res) => {
  const carInfo = new CarInfo({
    Type: req.body.Type,
    Name: req.body.Name,
    DriverName: req.body.DriverName,
    PhoneNumber: req.body.PhoneNumber,
    SeatInfo: req.body.SeatInfo,
    Info1: req.body.Info1,
    Info2: req.body.Info2,
    Info3: req.body.Info3,
    ImageName: req.body.ImageName,
    FacebookName: req.body.FacebookName,
    FacebookLink: req.body.FacebookLink,
    ZaloName: req.body.ZaloName,
    BankNumber: req.body.BankNumber,
    BankName: req.body.BankName,
    ImageQRBank: req.body.ImageQRBank
  });

  try {
    const newCarInfo = await carInfo.save();
    res.status(201).json(newCarInfo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;