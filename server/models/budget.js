const mongoose = require('mongoose');

// create schema for budget 
const budgetSchema = new mongoose.Schema({ 
  category: {type : String},
  amount: {type: Number}
})

const Budget = mongoose.model("budget", budgetSchema);

module.exports = Budget;
