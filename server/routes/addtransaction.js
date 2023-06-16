const router = require("express").Router();
const Transaction = require('../models/transaction');

router.post("/", async (req, res) => {
  let { name, category, amount } = req.body;

  try {
    const create = await Transaction.create({
      name,
      category,
      amount,
    });

    return res.json(create);
  } catch (error) {
    return res.status(400).json({ message: `Error while creating transaction: ${error}` });
  }
});

module.exports = router;
