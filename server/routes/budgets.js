const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const Budget = require('../models/budget');
const requireAuth = require('../middleware/requireAuth');

router.use(requireAuth);

// retrieve all budgets from db  
router.get("/", async (req, res) => { 
  const budgets = await Budget.find({})

  res.status(200).json(budgets)

});


// get a single Budget 
