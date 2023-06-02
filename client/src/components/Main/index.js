import "./index.css";

export default function Main() {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className="main_container">
			<nav className="navbar">
				<h1>Welcome to Moolah!</h1>
				<a href= "">Expense Tracker</a>
				<a href="">Budget Planner</a>
				<a href="">Bill Splitter</a>
				<button className="white_btn" onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);
};
