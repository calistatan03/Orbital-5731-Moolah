const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
