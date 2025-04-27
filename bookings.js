const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create booking
router.post('/', async (req, res) => {
  const newBooking = new Booking(req.body);
  await newBooking.save();
  res.json(newBooking);
});

module.exports = router;
