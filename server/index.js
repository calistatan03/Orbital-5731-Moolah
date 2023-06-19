require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const connection = require("./db");

//import routes
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const budgetRoutes = require('./routes/budgets');
const expenseRoutes = require('./routes/tracker');
const addBudgetRoutes = require('./routes/addbudget')
const transactionRoutes = require('./routes/addtransaction');
const addBillRoutes = require('./routes/addbill');

//connect to mongodb database
connection();

//middlewares
app.use(express.json())
app.use(cors());

//routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
//app.use("/api/budgetplanner", budgetRoutes);
app.use("/api/expensetracker", expenseRoutes);
app.use("/api/add-transaction", transactionRoutes);
app.use("/api/add-budget", addBudgetRoutes);
app.use("api/add-bill", addBillRoutes);

//set up port
const port = process.env.PORT || 8080;
app.listen(port, ()  => console.log(`Server is running on port: ${port}`));

