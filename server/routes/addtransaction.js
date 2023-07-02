const router = require("express").Router();
const Transaction = require('../models/transaction');
const requireAuth = require('../middleware/requireAuth');
// require auth for all transaction routes 
router.use(requireAuth);

// save the new budget data 
router.post("/", async (req, res) => {
  let { title, date, category, amount } = req.body;

  try {
    const user_id = req.user._id;
    const create = await Transaction.create({
      title,
      date,
      category,
      amount,
      user_id
    });

    return res.json(create);
  } catch (error) {
    return res.status(400).json({ message: `Error while creating transaction: ${error}` });
  }
});

router.get("/", async (req, res) => {
  try {
    const user_id = req.user._id
    const transactions = await Transaction.find({ user_id });
    return res.json(transactions);
  } catch (error) {
    return res.status(500).json({ message: `Error while retrieving transactions: ${error}` });
  }
});


router.get("/:duration", async (req, res) => {
  const { duration } = req.params;
  const user_id = req.user._id

  try {
    const transactions = await Transaction.find({user_id});
    // Filter transactions based on the duration
    let filteredTransactions = [];
    if (duration === 'week') {
      // Filter transactions for the past week
      const currentDate = new Date();
      const weekAgo = new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000);
      filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= weekAgo && transactionDate <= currentDate;
      });
    } else if (duration === 'month') {
      // Filter transactions for the current month
      const currentDate = new Date();
      const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= monthStart && transactionDate <= currentDate;
      });
    } else if (duration === 'year') {
      // Filter transactions for the current year
      const currentDate = new Date();
      const yearStart = new Date(currentDate.getFullYear(), 0, 1);
      filteredTransactions = transactions.filter((transaction) => {
        const transactionDate = new Date(transaction.date);
        return transactionDate >= yearStart && transactionDate <= currentDate;
      });
    }

    return res.json(filteredTransactions);
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
