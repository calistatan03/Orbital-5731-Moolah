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


router.get("/:duration/:year?/:month?", async (req, res) => {
  const { duration, year, month } = req.params;
  const user_id = req.user._id;

  try {
    let query = { user_id };

    if (duration === 'week') {
      const currentDate = new Date();
    const sevenDaysAgo = new Date(currentDate);
    sevenDaysAgo.setDate(currentDate.getDate() - 7);
    sevenDaysAgo.setHours(0, 0, 0, 0); // Set time to the start of the day

    const endOfToday = new Date(currentDate);
    endOfToday.setHours(23, 59, 59, 999);
    query.date = { $gte: sevenDaysAgo, $lte: endOfToday };
    
    } else if (duration === 'month' && year && month) {
      // Filter transactions for the selected month and year
      const selectedMonth = parseInt(month); // Months are zero-based in JavaScript Date
      const selectedYear = parseInt(year);
      const startDate = new Date(selectedYear, selectedMonth, 1);
      const endDate = new Date(selectedYear, selectedMonth + 1, 0, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    } else if (duration === 'year' && year) {
      // Filter transactions for the selected year
      const selectedYear = parseInt(year);
      const startDate = new Date(selectedYear, 0, 1);
      const endDate = new Date(selectedYear, 11, 31, 23, 59, 59);
      query.date = { $gte: startDate, $lte: endDate };
    } else {
      return res.status(400).json({ message: 'Invalid duration, year, or month' });
    }

    const transactions = await Transaction.find(query);
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