const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: Date, required: true },
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  user_id: {type:String, required:true}
});

const Transaction = mongoose.model('transaction', transactionSchema);

module.exports = Transaction;
