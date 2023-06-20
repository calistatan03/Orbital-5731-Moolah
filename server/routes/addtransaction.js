const router = require("express").Router();
const Transaction = require('../models/transaction');

router.post("/", async (req, res) => {
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
});

router.get("/", async (req, res) => {
  try {
    const transactions = await Transaction.find();
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ message: `Error while retrieving transactions: ${error}` });
  }
});

router.delete("/:_id", async (req, res) => {
  const transactionId = req.params._id;

  try {
    const deletedTransaction = await Transaction.findByIdAndDelete(transactionId);

    if (!deletedTransaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }

    return res.json({ message: 'Transaction deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Error while deleting transaction: ${error}` });
  }
});

module.exports = router;
