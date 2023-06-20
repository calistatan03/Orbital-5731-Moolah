import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Stats from "./components/ExpenseTracker/ExpenditureStats/Stats";
import Dashboard from "./components/BudgetPlanner/Dashboard";
import OpenForm from "./components/ExpenseTracker/AddTransaction/OpenForm";
import BudgetForm from "./components/BudgetPlanner/BudgetForm";
import Display from "./components/BillSplitter/Display";
import AddForm from "./components/BillSplitter/AddForm";

function App() {
	const user = localStorage.getItem("token");

	return (
		<div>
			<Routes>
			{user && <Route path="/" exact element={<HomePage />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path = "/budgetplanner" exact element = {<Dashboard/>} />
			<Route path = "/expensetracker" exact element = {<Stats />} />
			<Route path = "/add-transaction" exact element = {<OpenForm/>}/>
			<Route path = "/add-budget" exact element = {<BudgetForm/>}/>
			<Route path = "/billsplitter" exact element = {<Display/>}/>
			<Route path = "/add-bill" exact element = {<AddForm/>}/>
		</Routes>

		</div>


	);
}

export default App;