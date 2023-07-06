import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Stats from "./components/ExpenseTracker/ExpenditureStats/Stats";
import Dashboard from "./components/BudgetPlanner/Dashboard";
import OpenForm from "./components/ExpenseTracker/AddTransaction/OpenForm";
import BudgetForm from "./components/BudgetPlanner/BudgetForm";
import Display from "./components/BillSplitter/Display";
import AddForm from "./components/BillSplitter/AddForm";
import NavBar from "./components/NavBar/NavBar";
import Profile from "./components/Profile/Profile"
import { useAuthContext } from './hooks/useAuthContext';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


function App() {
	const { user } = useAuthContext()
	//const user = localStorage.getItem("token");
	const client = new QueryClient()

	return (
		<div>
			<QueryClientProvider client={client}>
			<Router>
				<Routes>
					{user && <Route path="/" exact element={<HomePage />} />}
					<Route path="/signup" element={!user ? <Signup /> : <Navigate to="/"/>} />
					<Route path="/login" element={!user ? <Login/> : <Navigate to="/"/>}/>
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path = "/budgetplanner" exact element = {user ? <Dashboard/> : <Navigate to="/login"/>} />
					<Route path = "/expensetracker" exact element = {user ? <Stats /> : <Navigate to="/login"/>} />
					<Route path = "/add-transaction" exact element = {user ? <OpenForm/> : <Navigate to="/login"/>}/>
					<Route path = "/add-budget" exact element = {user ? <BudgetForm/> : <Navigate to="/login"/>}/>
					<Route path = "/billsplitter" exact element = {user ? <Display/> : <Navigate to="/login"/>}/>
					<Route path = "/add-bill" exact element = {user ? <AddForm/> : <Navigate to="/login"/>}/>
					<Route path = "/profile" exact element = {user ? <Profile/> : <Navigate to="/login"/>}/>
				</Routes>
			</Router>
			</QueryClientProvider>
		</div>


	);
}

export default App;