import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { lazy, Suspense, useState } from "react";
import Stats from "./components/ExpenseTracker/ExpenditureStats/Stats";
import Dashboard from "./components/BudgetPlanner/Dashboard";
import OpenForm from "./components/ExpenseTracker/AddTransaction/OpenForm";
import BudgetForm from "./components/BudgetPlanner/BudgetForm";
import Display from "./components/BillSplitter/Display/Display";
import AddForm from "./components/BillSplitter/AddBill/AddForm";
import Profile from "./components/Profile/Profile"
import { useAuthContext } from './hooks/useAuthContext';
import TransactionCalendar from "./components/ExpenseTracker/FeaturePage/TransactionCalendar";
import {BudgetsContext} from "./context/BudgetsContext";
import { QueryClientProvider, QueryClient, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from "axios";
import './App.css';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoginPage from "./components/Login/LoginPage";
import SignupPage from "./components/Signup/SignupPage";

const HomePage = lazy(() => import("./components/HomePage/HomePage"));
const Signup = lazy(() => import("./components/Signup"));
const Login = lazy(() => import("./components/Login"));

function App() {
	const { user } = useAuthContext();
	const client = new QueryClient();

	return (
		<div>
			<ToastContainer
				className="toast-position"
				autoClose= {2000}
			/>
			<QueryClientProvider client={client}>
			<Router>
				<Suspense> 
				<Routes>
					{user && <Route path="/" exact element={<HomePage />} />}
					<Route path="/signup" element={!user ? <SignupPage /> : <Navigate to="/"/>} />
					<Route path="/login" element={!user ? <LoginPage/> : <Navigate to="/"/>}/>
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path = "/budgetplanner" exact element = {user ? <Dashboard/> : <Navigate to="/login"/>} />
					<Route path = "/expensetracker" exact element = {user ? <Stats /> : <Navigate to="/login"/>} />
					<Route path = "/add-transaction" exact element = {user ? <OpenForm/> : <Navigate to="/login"/>}/>
					<Route path = "/add-budget" exact element = {user ? <BudgetForm/> : <Navigate to="/login"/>}/>
					<Route path = "/billsplitter" exact element = {user ? <Display/> : <Navigate to="/login"/>}/>
					<Route path = "/add-bill" exact element = {user ? <AddForm/> : <Navigate to="/login"/>}/>
					<Route path = "/profile" exact element = {user ? <Profile/> : <Navigate to="/login"/>}/>
					<Route path = "*" element={<h1>PAGE NOT FOUND</h1>} />
				</Routes>
				</Suspense>
			</Router>
			</QueryClientProvider>
		</div>
	

	);
}

export default App;