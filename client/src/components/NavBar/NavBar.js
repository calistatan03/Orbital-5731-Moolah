import { Link } from 'react-router-dom';
import './NavBar.css';
import { useLogout } from '../../hooks/useLogout'
import moolahlogo from '../../images/moolahlogo.png'
import LogoutIcon from '@mui/icons-material/Logout';
import {useAuthContext} from '../../hooks/useAuthContext';

export default function NavBar() {
	const {user} = useAuthContext()

	const { logout } = useLogout()
	
	const handleLogout = () => {
		logout();
	};

	return (
		<div className="main_container">
			<nav className="navbar">
					<Link to="/" className="link_to_homepage">
					<div className="moolah-title">Moolah!
						<img src={moolahlogo} alt="Logo" className="moolahlogo" />
					</div>
				</Link>

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
							<LogoutIcon/>
						</button>
						</li>
					</ul>
				</div>
			</nav>
		</div>
	);
};
