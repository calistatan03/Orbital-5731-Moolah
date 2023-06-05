import { Link } from 'react-router-dom';
import './NavBar.css';

export default function NavBar() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<nav className="navbar">
				<div className="moolah-title">Moolah!</div>
				<Link to="#" className="toggle-button">
					<span className="bar"></span>
					<span className="bar"></span>
					<span className="bar"></span>
				</Link>
				<div class="navbar-links">
					<ul> 
						<li><Link to= "/expensetracker">Expense Tracker</Link></li>
						<li><Link to="/budgetplanner">Budget Planner</Link></li>
						<li><Link to="/billsplitter">Bill Splitter</Link></li> 
						<li><button className="logout_button" onClick={handleLogout}>
							Logout
						</button>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
