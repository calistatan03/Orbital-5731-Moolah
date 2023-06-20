const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const Budget = require('../models/budget');

// create a new budget 
router.post("/", async (req, res) => { 

  // extracting properties from req.body 
  const { category, amount } = req.body;
  
  try {
    const budget = new Budget({
      category,
      amount
    });

    const newBudget = await budget.save(); 
    return res.status(200).json(newBudget);
  } catch (error) {
    return res.status(400).json({ message: `Error while creating budget: ${error}` });
  }
});


// retrieve all budgets from database 
router.get("/", async (req, res) => {
  try {
    const budgets = await Budget.find();
    return res.json(budgets);
  } catch (error) {
    return res.status(500).json({ message: `Error while retrieving budget: ${error}` });
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

// delete a single budget 
router.delete("/:_id", async (req, res) => {
  const budgetId = req.params._id;

  try {
    const deletedBudget = await Budget.findByIdAndDelete(budgetId);

    if (!deletedBudget) {
      return res.status(404).json({ message: 'Budget not found' });
    }

    return res.json({ message: 'Budget deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Error while deleting transaction: ${error}` });
  }
});

// find a budget based on category 
router.get("/:_id", async (req, res) => { 
  const budgetCategory = req.params.amount;


})

module.exports = router; 