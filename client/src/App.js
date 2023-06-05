import { Route, Routes, Navigate } from "react-router-dom";
import HomePage from "./components/HomePage/HomePage";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Display from "./components/BudgetPlanner/Dashboard";


function App() {
	const user = localStorage.getItem("token");

	return (
		<div>
			<Routes>
			{user && <Route path="/" exact element={<HomePage />} />}
			<Route path="/signup" exact element={<Signup />} />
			<Route path="/login" exact element={<Login />} />
			<Route path="/" element={<Navigate replace to="/login" />} />
			<Route path = "/budgetplanner" exact element = {<Display/>} />
		</Routes>

		</div>


	);
}

export default App;