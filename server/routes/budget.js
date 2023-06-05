const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const { Budget, categories } = require('../models/budget');


router.post("/budgetplanner", async (req, res) => { 
  // extracting properties from req.body 
  const { category, amount } = req.body; 
  
  // creating a new 'Document' from the Budget model 
  let budget = new Budget({ 
    category, amount, id,
  })


  try { 
    budget = await budget.save() 
    res.send(budget)
  } catch(error) { 
    res.status(500).send(error.message)
    console.log(error.message)
  }

})

module.exports = router; 