const mongoose = require('mongoose');

// create schema for budget 
const budgetSchema = new mongoose.Schema({ 
  category: {type : String, required: true},
  amount: {type: Number, required: true},
  user_id: {type:String, required:true}
})

const Budget = mongoose.model("budget", budgetSchema);

module.exports = Budget;
