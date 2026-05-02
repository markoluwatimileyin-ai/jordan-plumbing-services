const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// SUBMIT CONTACT MESSAGE
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Save to database first
    const contact = new Contact({ name, email, message });
    await contact.save();
    console.log('Saved to database successfully');

    // Try sending email
    try {
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: process.env.EMAIL_USER,
        subject: `New Message from ${name}`,
        html: `<h2>New Contact Message</h2>
               <p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`
      });
      console.log('Email sent successfully!');
    } catch (emailErr) {
      console.log('Email failed:', emailErr.message);
    }

    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.log('Server error:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;