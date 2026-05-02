const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const nodemailer = require('nodemailer');

// Email transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// SUBMIT BOOKING
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, location, service, problem } = req.body;

    const booking = new Booking({ name, email, phone, location, service, problem });
    await booking.save();

    // Send confirmation email to customer
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Booking Confirmed - Jordan Plumbing Services',
      html: `
        <h2>Hi ${name}, your booking has been received!</h2>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Problem:</strong> ${problem || 'Not specified'}</p>
        <p>We will contact you shortly on <strong>${phone}</strong> to confirm your appointment.</p>
        <br/>
        <p>Thank you for choosing Jordan Plumbing Services!</p>
      `
    });

    // Notify business owner
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Booking: ${service} from ${name}`,
      html: `
        <h2>New Booking Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Problem:</strong> ${problem || 'Not specified'}</p>
      `
    });

    res.status(201).json({ message: 'Booking submitted successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET ALL BOOKINGS (admin use)
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ createdAt: -1 });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// UPDATE BOOKING STATUS
router.patch('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    res.json(booking);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
