const mongoose = require('mongoose');

// create schema for budget 
const billSchema = new mongoose.Schema({ 
  title: {type : String, required: true},
  amount: {type: Number, required: true},
  date: {type: Date, required: true},
  memberName: { type: String, required: true},
  paidMember: {type: String},
  user_id: {type:String, required:true},
})

const Bill = mongoose.model("bill", billSchema);

module.exports = Bill;
