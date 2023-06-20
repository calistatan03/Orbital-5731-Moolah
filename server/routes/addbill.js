const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const Bill = require('../models/bill');

// create a new bill 
router.post("/", async (req, res) => { 

  // extracting properties from req.body 
  const { title, amount, numOfMembers, memberNames, paidMember } = req.body;
  
  try {
    
    const bill = new Bill({
      title,
      amount,
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
  
  /*creating a new 'Document' from the Budget model 
  let budget = new Budget({ 
    category, amount, id,
  })


  try { 
    budget = await budget.save() 
    res.send(budget)
  } catch(error) { 
    res.status(500).send(error.message)
    console.log(error.message)
  }*/


module.exports = router; 