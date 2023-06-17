const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const Transaction = require('../models/transaction');


router.post("/", async (req, res) => { 
  try {
  // extracting properties from req.body 
  let { name, category, amount } = req.body; 
  
  const create_transaction = new Transaction({ 
    name, category, amount
  });

  await transaction.save();
  
  res.status(201).json(transaction);
  } catch(error) { 
    res.status(500).send(error.message)
    console.log(error.message)
  }

});

module.exports = router; 