const express = require('express');
const router = express.Router();
const Driver = require('../models/Driver');

router.post('/drivers', async (req, res) => {
    try {
        const driver = new Driver(req.body);
        await driver.save();
        res.status(201).send(driver);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;