const mongoose = require('mongoose');

// create schema for budget 
const billSchema = new mongoose.Schema({ 
  title: {type : String, required: true},
  amount: {type: Number, required: true},
  date: {type: Date, required: true},
  numOfMembers: {type: Number, required:true}, 
  memberNames: {type: Array, required: true},
  paidMember: {type: String}
})

const Bill = mongoose.model("bill", billSchema);

module.exports = Bill;
