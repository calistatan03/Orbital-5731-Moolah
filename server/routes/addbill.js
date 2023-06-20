const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const Bill = require('../models/bill');

// create a new bill 
router.post("/", async (req, res) => { 

  // extracting properties from req.body 
  const { title, amount, date, numOfMembers, memberNames, paidMember } = req.body;
  
  try {
    
    const bill = new Bill({
      title,
      amount,
      date,
      numOfMembers,
      memberNames,
      paidMember
    });

    const newBill = await bill.save(); 
    res.status(200).json(newBill);
  } catch (error) {
    return res.status(400).json({ message: `Error while creating bill: ${error}` });
  }
});

// fetch all bill records from database 
router.get("/", async (req, res) => {
  try {
    const bills = await Bill.find();
    return res.json(bills);
  } catch (error) {
    return res.status(500).json({ message: `Error while retrieving bill: ${error}` });
  }
});
  


module.exports = router; 