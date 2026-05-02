const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// PLACE ORDER
router.post('/', async (req, res) => {
  try {
    const { customerName, customerEmail, items, total } = req.body;

    const order = new Order({ customerName, customerEmail, items, total });
    await order.save();

    // Send confirmation to customer if email provided
    if (customerEmail) {
      const itemsList = items.map(i => `<li>${i.name} - ₦${i.price.toLocaleString()}</li>`).join('');
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: customerEmail,
        subject: 'Order Received - Jordan Plumbing Services',
        html: `
          <h2>Hi ${customerName || 'Customer'}, your order has been received!</h2>
          <ul>${itemsList}</ul>
          <p><strong>Total: ₦${total.toLocaleString()}</strong></p>
          <p>We will process your order and contact you shortly.</p>
          <br/>
          <p>Jordan Plumbing Services</p>
        `
      });
    }

    // Notify business owner
    const itemsList = items.map(i => `<li>${i.name} - ₦${i.price.toLocaleString()}</li>`).join('');
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Order - ₦${total.toLocaleString()}`,
      html: `
        <h2>New Order Placed</h2>
        <p><strong>Customer:</strong> ${customerName || 'Guest'}</p>
        <p><strong>Email:</strong> ${customerEmail || 'Not provided'}</p>
        <ul>${itemsList}</ul>
        <p><strong>Total: ₦${total.toLocaleString()}</strong></p>
      `
    });

    res.status(201).json({ message: 'Order placed successfully!' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// GET ALL ORDERS (admin use)
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
