const mongoose = require('mongoose');

// create schema for category 
const categorySchema = new mongoose.Schema({ 
  name: {type: String}
})

// create schema for budget 
const budgetSchema = new mongoose.Schema({ 
  category: {type : String},
  amount: {type: Number}
})

const categories = mongoose.model("category", budgetSchema);
const budgets = mongoose.model("budget", budgetSchema);

module.exports = { budgets, categories };
