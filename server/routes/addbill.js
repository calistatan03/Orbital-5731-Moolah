const router = require("express").Router(); //imports the Express Router module and creates a new router object that can be used to define routes
const Bill = require('../models/bill');
const requireAuth = require('../middleware/requireAuth');
// require auth for all bill routes
router.use(requireAuth);

// create a new bill 
router.post("/", async (req, res) => { 

  const user_id = req.user._id

  // extracting properties from req.body 
  const { title, amount, date, memberName, paidMember } = req.body;
  
  try {
    const user_id = req.user._id;
    const bill = new Bill({
      title,
      amount,
      date,
      memberName,
      paidMember,
      user_id
    });

    const newBill = await bill.save(); 
    res.status(200).json(newBill);
  } catch (error) {
    return res.status(400).json({ message: `Error while creating bill: ${error}` });
  }
});

// fetch all bill records from database 
router.get("/", async (req, res) => {

  const user_id = req.user._id;
  try {
    const bills = await Bill.find({user_id});
    return res.json(bills);
  } catch (error) {
    return res.status(500).json({ message: `Error while retrieving bill: ${error}` });
  }
});
  
// delete a single from the database (marked as completed)
router.delete("/:_id", async (req, res) => {
  const billId = req.params._id;

  try {
    const deletedBill = await Bill.findByIdAndDelete(billId);

    if (!deletedBill) {
      return res.status(404).json({ message: 'Bill not found' });
    }

    return res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: `Error while deleting bill: ${error}` });
  }
});

module.exports = router; 