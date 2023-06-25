const router = require("express").Router();
const Transaction = require('../models/transaction');

const addExpense = async (req, res) => {
  let { title, date, category, amount } = req.body;

  try {
    const create = await Transaction.create({
      title,
      date,
      category,
      amount,
    });

    return res.json(create);
  } catch (error) {
    return res.status(400).json({ message: `Error while creating transaction: ${error}` });
  }
}

module.exports = {addExpense}; 