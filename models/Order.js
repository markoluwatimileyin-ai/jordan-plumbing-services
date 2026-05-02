const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String },
  customerEmail: { type: String },
  items: [{ name: String, price: Number }],
  total: { type: Number, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);